import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateWishDto, UpdateWishDto, OptimizeWishDto } from '../../dto/wish.dto';
import { AIService } from '../../ai/ai.service';

@Injectable()
export class WishService {
  constructor(
    private prisma: PrismaService,
    private aiService: AIService,
  ) {}

  async create(createWishDto: CreateWishDto, userId: string) {
    // Extract keywords from title and description if not provided
    const keywords = createWishDto.keywords || this.extractKeywords(createWishDto.title);
    
    const wish = await this.prisma.wish.create({
      data: {
        ...createWishDto,
        keywords,
        userId,
      },
      include: {
        user: true,
        goals: true,
        visionBoardItems: true,
      },
    });

    // Award points for creating a wish
    await this.prisma.growthPoint.create({
      data: {
        userId,
        points: 10,
        source: 'wish_created',
        sourceId: wish.id,
      },
    });

    return wish;
  }

  async findAll(userId: string) {
    return this.prisma.wish.findMany({
      where: { userId },
      include: {
        user: true,
        goals: {
          orderBy: { order: 'asc' },
        },
        visionBoardItems: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    return this.prisma.wish.findFirst({
      where: { id, userId },
      include: {
        user: true,
        goals: {
          orderBy: { order: 'asc' },
          include: {
            checkIns: {
              orderBy: { createdAt: 'desc' },
            },
          },
        },
        visionBoardItems: true,
      },
    });
  }

  async update(id: string, updateWishDto: UpdateWishDto, userId: string) {
    return this.prisma.wish.update({
      where: { id, userId },
      data: updateWishDto,
      include: {
        user: true,
        goals: true,
        visionBoardItems: true,
      },
    });
  }

  async remove(id: string, userId: string) {
    return this.prisma.wish.delete({
      where: { id, userId },
    });
  }

  async optimizeWish(optimizeWishDto: OptimizeWishDto, userId: string) {
    const wish = await this.prisma.wish.findFirst({
      where: { id: optimizeWishDto.wishId, userId },
    });

    if (!wish) {
      throw new Error('Wish not found');
    }

    // Use AI to optimize the wish
    const optimizedText = await this.aiService.optimizeWish(
      wish.title,
      wish.description,
      optimizeWishDto.focus,
    );

    const updatedWish = await this.prisma.wish.update({
      where: { id: wish.id },
      data: {
        optimizedText,
        isOptimized: true,
      },
      include: {
        user: true,
        goals: true,
        visionBoardItems: true,
      },
    });

    // Log AI interaction
    await this.prisma.aIInteraction.create({
      data: {
        type: 'wish_optimization',
        input: JSON.stringify({ title: wish.title, description: wish.description }),
        output: optimizedText,
      },
    });

    return updatedWish;
  }

  async generateImageForWish(wishId: string, userId: string) {
    const wish = await this.prisma.wish.findFirst({
      where: { id: wishId, userId },
    });

    if (!wish) {
      throw new Error('Wish not found');
    }

    // Generate image using AI service
    const imageUrl = await this.aiService.generateImage(
      wish.optimizedText || wish.title,
      wish.keywords,
    );

    // Log AI interaction
    await this.prisma.aIInteraction.create({
      data: {
        type: 'image_generation',
        input: JSON.stringify({ text: wish.optimizedText || wish.title, keywords: wish.keywords }),
        output: imageUrl,
      },
    });

    return { imageUrl };
  }

  async getWishStats(userId: string) {
    const wishes = await this.prisma.wish.findMany({
      where: { userId },
      include: {
        goals: true,
      },
    });

    const totalWishes = wishes.length;
    const activeWishes = wishes.filter(w => w.status === 'active').length;
    const completedWishes = wishes.filter(w => w.status === 'completed').length;
    const optimizedWishes = wishes.filter(w => w.isOptimized).length;

    const categoryStats = wishes.reduce((acc, wish) => {
      acc[wish.category] = (acc[wish.category] || 0) + 1;
      return acc;
    }, {});

    return {
      totalWishes,
      activeWishes,
      completedWishes,
      optimizedWishes,
      categoryStats,
    };
  }

  private extractKeywords(text: string): string[] {
    // Simple keyword extraction - in production, use NLP
    const words = text.toLowerCase()
      .replace(/[^\w\s\u4e00-\u9fff]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 1);
    
    // Remove common words and return unique keywords
    const stopWords = new Set(['i', 'me', 'my', 'myself', 'we', 'our', 'ours', '已经', '拥有', '的', '了', '是', '在', '有', '和', '就', '不', '人', '都', '一', '个', '上', '也', '很', '到', '说', '要', '去', '你', '会', '着', '没有', '看', '好', '自己', '这']);
    
    return [...new Set(words.filter(word => !stopWords.has(word)))].slice(0, 10);
  }
}