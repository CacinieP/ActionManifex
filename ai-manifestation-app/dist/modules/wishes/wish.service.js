"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const ai_service_1 = require("../../ai/ai.service");
let WishService = class WishService {
    constructor(prisma, aiService) {
        this.prisma = prisma;
        this.aiService = aiService;
    }
    async create(createWishDto, userId) {
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
    async findAll(userId) {
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
    async findOne(id, userId) {
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
    async update(id, updateWishDto, userId) {
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
    async remove(id, userId) {
        return this.prisma.wish.delete({
            where: { id, userId },
        });
    }
    async optimizeWish(optimizeWishDto, userId) {
        const wish = await this.prisma.wish.findFirst({
            where: { id: optimizeWishDto.wishId, userId },
        });
        if (!wish) {
            throw new Error('Wish not found');
        }
        const optimizedText = await this.aiService.optimizeWish(wish.title, wish.description, optimizeWishDto.focus);
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
        await this.prisma.aIInteraction.create({
            data: {
                type: 'wish_optimization',
                input: JSON.stringify({ title: wish.title, description: wish.description }),
                output: optimizedText,
            },
        });
        return updatedWish;
    }
    async generateImageForWish(wishId, userId) {
        const wish = await this.prisma.wish.findFirst({
            where: { id: wishId, userId },
        });
        if (!wish) {
            throw new Error('Wish not found');
        }
        const imageUrl = await this.aiService.generateImage(wish.optimizedText || wish.title, wish.keywords);
        await this.prisma.aIInteraction.create({
            data: {
                type: 'image_generation',
                input: JSON.stringify({ text: wish.optimizedText || wish.title, keywords: wish.keywords }),
                output: imageUrl,
            },
        });
        return { imageUrl };
    }
    async getWishStats(userId) {
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
    extractKeywords(text) {
        const words = text.toLowerCase()
            .replace(/[^\w\s\u4e00-\u9fff]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 1);
        const stopWords = new Set(['i', 'me', 'my', 'myself', 'we', 'our', 'ours', '已经', '拥有', '的', '了', '是', '在', '有', '和', '就', '不', '人', '都', '一', '个', '上', '也', '很', '到', '说', '要', '去', '你', '会', '着', '没有', '看', '好', '自己', '这']);
        return [...new Set(words.filter(word => !stopWords.has(word)))].slice(0, 10);
    }
};
exports.WishService = WishService;
exports.WishService = WishService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        ai_service_1.AIService])
], WishService);
//# sourceMappingURL=wish.service.js.map