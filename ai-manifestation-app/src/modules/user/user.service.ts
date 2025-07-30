import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from '../../dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      include: {
        wishes: true,
        goals: true,
        gratitudes: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        wishes: {
          include: {
            goals: true,
            visionBoardItems: true,
          },
        },
        goals: {
          include: {
            checkIns: true,
          },
        },
        gratitudes: true,
        checkIns: true,
        rewards: true,
        growthPoints: true,
        visionBoards: {
          include: {
            items: true,
          },
        },
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async getUserStats(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        wishes: true,
        goals: true,
        gratitudes: true,
        checkIns: true,
        rewards: true,
        growthPoints: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const totalPoints = user.growthPoints.reduce((sum, point) => sum + point.points, 0);
    const activeGoals = user.goals.filter(goal => goal.status === 'in_progress').length;
    const completedGoals = user.goals.filter(goal => goal.status === 'completed').length;
    const totalGratitudeDays = user.gratitudes.length;

    return {
      totalPoints,
      activeGoals,
      completedGoals,
      totalGratitudeDays,
      wishCount: user.wishes.length,
      recentActivity: {
        lastWish: user.wishes[0]?.createdAt,
        lastCheckIn: user.checkIns[0]?.createdAt,
        lastGratitude: user.gratitudes[0]?.createdAt,
      },
    };
  }
}