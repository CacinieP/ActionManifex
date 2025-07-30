import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateGoalDto, UpdateGoalDto, GenerateGoalsDto } from '../../dto/goal.dto';
import { AIService } from '../../ai/ai.service';

@Injectable()
export class GoalService {
  constructor(
    private prisma: PrismaService,
    private aiService: AIService,
  ) {}

  async create(createGoalDto: CreateGoalDto, userId: string) {
    // Get the order for the new goal
    const lastGoal = await this.prisma.goal.findFirst({
      where: { wishId: createGoalDto.wishId },
      orderBy: { order: 'desc' },
    });

    const order = lastGoal ? lastGoal.order + 1 : 0;

    const goal = await this.prisma.goal.create({
      data: {
        ...createGoalDto,
        order,
        userId,
      },
      include: {
        user: true,
        wish: true,
        checkIns: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    // Award points for creating a goal
    await this.prisma.growthPoint.create({
      data: {
        userId,
        points: 5,
        source: 'goal_created',
        sourceId: goal.id,
      },
    });

    return goal;
  }

  async findAll(userId: string) {
    return this.prisma.goal.findMany({
      where: { userId },
      include: {
        user: true,
        wish: true,
        checkIns: {
          orderBy: { createdAt: 'desc' },
          take: 1, // Latest check-in only
        },
      },
      orderBy: [
        { wishId: 'asc' },
        { order: 'asc' },
      ],
    });
  }

  async findOne(id: string, userId: string) {
    return this.prisma.goal.findFirst({
      where: { id, userId },
      include: {
        user: true,
        wish: true,
        checkIns: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async update(id: string, updateGoalDto: UpdateGoalDto, userId: string) {
    const currentGoal = await this.prisma.goal.findFirst({
      where: { id, userId },
    });

    if (!currentGoal) {
      throw new Error('Goal not found');
    }

    // Check if goal is being marked as completed
    const isCompleted = updateGoalDto.status === 'completed' && currentGoal.status !== 'completed';
    
    const updatedGoal = await this.prisma.goal.update({
      where: { id },
      data: {
        ...updateGoalDto,
        completedAt: isCompleted ? new Date() : currentGoal.completedAt,
      },
      include: {
        user: true,
        wish: true,
        checkIns: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    // Award points for completing a goal
    if (isCompleted) {
      await this.prisma.growthPoint.create({
        data: {
          userId,
          points: 20,
          source: 'goal_completed',
          sourceId: updatedGoal.id,
        },
      });

      // Generate reward
      await this.generateCompletionReward(userId, updatedGoal);
    }

    return updatedGoal;
  }

  async remove(id: string, userId: string) {
    return this.prisma.goal.delete({
      where: { id, userId },
    });
  }

  async generateSMARTGoals(generateGoalsDto: GenerateGoalsDto, userId: string) {
    const wish = await this.prisma.wish.findFirst({
      where: { id: generateGoalsDto.wishId, userId },
    });

    if (!wish) {
      throw new Error('Wish not found');
    }

    // Generate SMART goals using AI
    const smartGoals = await this.aiService.generateSMARTGoals(
      wish.optimizedText || wish.title
    );

    const count = generateGoalsDto.count || Math.min(5, Math.max(3, smartGoals.length));
    const selectedGoals = smartGoals.slice(0, count);

    // Get the current maximum order
    const lastGoal = await this.prisma.goal.findFirst({
      where: { wishId: wish.id },
      orderBy: { order: 'desc' },
    });

    let baseOrder = lastGoal ? lastGoal.order + 1 : 0;

    const createdGoals = [];
    for (let i = 0; i < selectedGoals.length; i++) {
      const goalData = selectedGoals[i];
      const goal = await this.prisma.goal.create({
        data: {
          title: goalData.title,
          description: goalData.description,
          type: 'smart_goal',
          status: 'pending',
          priority: 'medium',
          order: baseOrder + i,
          specific: goalData.specific,
          measurable: goalData.measurable,
          achievable: goalData.achievable,
          relevant: goalData.relevant,
          timeBound: goalData.timeBound,
          wishId: wish.id,
          userId,
        },
        include: {
          user: true,
          wish: true,
          checkIns: true,
        },
      });

      createdGoals.push(goal);

      // Award points for AI-generated goal
      await this.prisma.growthPoint.create({
        data: {
          userId,
          points: 8,
          source: 'ai_goal_generated',
          sourceId: goal.id,
        },
      });
    }

    // Log AI interaction
    await this.prisma.aIInteraction.create({
      data: {
        type: 'goal_generation',
        input: JSON.stringify({ wishId: wish.id, wishText: wish.title }),
        output: JSON.stringify(selectedGoals),
      },
    });

    return createdGoals;
  }

  async getGoalProgress(wishId: string, userId: string) {
    const goals = await this.prisma.goal.findMany({
      where: { wishId, userId },
      include: {
        checkIns: true,
      },
    });

    const totalGoals = goals.length;
    const completedGoals = goals.filter(g => g.status === 'completed').length;
    const inProgressGoals = goals.filter(g => g.status === 'in_progress').length;
    const overallProgress = totalGoals > 0 ? Math.round(
      goals.reduce((sum, goal) => sum + goal.progress, 0) / totalGoals
    ) : 0;

    const goalProgress = goals.map(goal => ({
      id: goal.id,
      title: goal.title,
      status: goal.status,
      progress: goal.progress,
      checkInCount: goal.checkIns.length,
      lastCheckIn: goal.checkIns[0]?.createdAt,
    }));

    return {
      totalGoals,
      completedGoals,
      inProgressGoals,
      overallProgress,
      goalProgress,
    };
  }

  async getUpcomingGoals(userId: string) {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    return this.prisma.goal.findMany({
      where: {
        userId,
        status: { in: ['pending', 'in_progress'] },
        dueDate: {
          gte: today,
          lte: nextWeek,
        },
      },
      include: {
        wish: true,
        checkIns: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { dueDate: 'asc' },
    });
  }

  async reorderGoals(wishId: string, goalIds: string[], userId: string) {
    const updatePromises = goalIds.map((goalId, index) => 
      this.prisma.goal.updateMany({
        where: { 
          id: goalId, 
          wishId, 
          userId 
        },
        data: { order: index },
      })
    );

    await Promise.all(updatePromises);

    return this.prisma.goal.findMany({
      where: { wishId, userId },
      orderBy: { order: 'asc' },
    });
  }

  private async generateCompletionReward(userId: string, goal: any) {
    const quote = await this.aiService.generateInspirationQuote('goal_completion');
    
    await this.prisma.reward.create({
      data: {
        userId,
        type: 'quote',
        title: '目标完成奖励',
        description: `恭喜完成目标："${goal.title}"`,
        content: quote,
        points: 50,
        category: 'achievement',
      },
    });
  }
}