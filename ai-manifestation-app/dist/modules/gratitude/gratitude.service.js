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
exports.GratitudeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const ai_service_1 = require("../../ai/ai.service");
let GratitudeService = class GratitudeService {
    constructor(prisma, aiService) {
        this.prisma = prisma;
        this.aiService = aiService;
    }
    async create(createGratitudeDto, userId) {
        const analysis = await this.aiService.analyzeGratitudeSentiment(createGratitudeDto.content);
        const aiQuote = await this.aiService.generateInspirationQuote('gratitude');
        const gratitude = await this.prisma.gratitude.create({
            data: {
                ...createGratitudeDto,
                mood: createGratitudeDto.mood || analysis.mood,
                tags: createGratitudeDto.tags || analysis.keywords,
                aiQuote,
                userId,
            },
            include: {
                user: true,
            },
        });
        await this.prisma.growthPoint.create({
            data: {
                userId,
                points: 5,
                source: 'gratitude_entry',
                sourceId: gratitude.id,
            },
        });
        await this.checkAndAwardStreakBonus(userId);
        return gratitude;
    }
    async findAll(userId, limit) {
        return this.prisma.gratitude.findMany({
            where: { userId },
            include: {
                user: true,
            },
            orderBy: { createdAt: 'desc' },
            take: limit,
        });
    }
    async findOne(id, userId) {
        return this.prisma.gratitude.findFirst({
            where: { id, userId },
            include: {
                user: true,
            },
        });
    }
    async update(id, updateGratitudeDto, userId) {
        return this.prisma.gratitude.update({
            where: { id, userId },
            data: updateGratitudeDto,
            include: {
                user: true,
            },
        });
    }
    async remove(id, userId) {
        return this.prisma.gratitude.delete({
            where: { id, userId },
        });
    }
    async getGratitudeStats(userId) {
        const gratitudes = await this.prisma.gratitude.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
        const totalEntries = gratitudes.length;
        const currentStreak = await this.calculateCurrentStreak(userId);
        const longestStreak = await this.calculateLongestStreak(userId);
        const thisMonthEntries = gratitudes.filter(g => {
            const entryDate = new Date(g.createdAt);
            const now = new Date();
            return entryDate.getMonth() === now.getMonth() &&
                entryDate.getFullYear() === now.getFullYear();
        }).length;
        const moodCounts = gratitudes.reduce((acc, gratitude) => {
            const mood = gratitude.mood || 'neutral';
            acc[mood] = (acc[mood] || 0) + 1;
            return acc;
        }, {});
        const allTags = gratitudes.flatMap(g => g.tags);
        const tagCounts = allTags.reduce((acc, tag) => {
            acc[tag] = (acc[tag] || 0) + 1;
            return acc;
        }, {});
        const topTags = Object.entries(tagCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10)
            .map(([tag]) => tag);
        return {
            totalEntries,
            currentStreak,
            longestStreak,
            thisMonthEntries,
            moodCounts,
            topTags,
            recentActivity: gratitudes.slice(0, 7),
        };
    }
    async getGratitudeCalendar(userId, year, month) {
        const targetDate = new Date();
        if (year)
            targetDate.setFullYear(year);
        if (month)
            targetDate.setMonth(month);
        const startDate = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
        const endDate = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);
        const gratitudes = await this.prisma.gratitude.findMany({
            where: {
                userId,
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            select: {
                createdAt: true,
                mood: true,
                tags: true,
            },
        });
        const calendar = {};
        gratitudes.forEach(gratitude => {
            const dateKey = gratitude.createdAt.toISOString().split('T')[0];
            if (!calendar[dateKey]) {
                calendar[dateKey] = {
                    count: 0,
                    moods: [],
                    tags: [],
                };
            }
            calendar[dateKey].count++;
            if (gratitude.mood) {
                calendar[dateKey].moods.push(gratitude.mood);
            }
            calendar[dateKey].tags.push(...gratitude.tags);
        });
        return {
            month: targetDate.getMonth() + 1,
            year: targetDate.getFullYear(),
            calendar,
            totalDays: Object.keys(calendar).length,
        };
    }
    async getDailyGratitudePrompt(userId) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const todayGratitude = await this.prisma.gratitude.findFirst({
            where: {
                userId,
                createdAt: {
                    gte: today,
                    lt: tomorrow,
                },
            },
        });
        if (todayGratitude) {
            return {
                prompt: '今天已经记录了感恩，真棒！要不要再记录一些其他的感恩事项？',
                hasTodayEntry: true,
                suggestions: [
                    '今天学到了什么新东西？',
                    '今天有什么让你感到温暖的小事？',
                    '今天遇到的美好瞬间是什么？',
                ],
            };
        }
        const recentGratitudes = await this.prisma.gratitude.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 10,
        });
        const recentTags = recentGratitudes.flatMap(g => g.tags);
        const uniqueTags = [...new Set(recentTags)];
        const prompts = [
            '今天有什么让你感到感恩的事情？',
            '今天学到了什么值得感恩的事情？',
            '今天遇到的美好瞬间是什么？',
            '今天有什么人或事让你感到温暖？',
            '今天有什么进步让你感到自豪？',
        ];
        return {
            prompt: prompts[Math.floor(Math.random() * prompts.length)],
            hasTodayEntry: false,
            suggestions: uniqueTags.slice(0, 5),
        };
    }
    async searchGratitudes(userId, query) {
        return this.prisma.gratitude.findMany({
            where: {
                userId,
                OR: [
                    {
                        content: {
                            contains: query,
                            mode: 'insensitive',
                        },
                    },
                    {
                        tags: {
                            has: query,
                        },
                    },
                ],
            },
            include: {
                user: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async calculateCurrentStreak(userId) {
        const gratitudes = await this.prisma.gratitude.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            select: { createdAt: true },
        });
        if (gratitudes.length === 0)
            return 0;
        let streak = 0;
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        for (const gratitude of gratitudes) {
            const gratitudeDate = new Date(gratitude.createdAt);
            gratitudeDate.setHours(0, 0, 0, 0);
            const diffDays = Math.floor((currentDate.getTime() - gratitudeDate.getTime()) / (1000 * 60 * 60 * 24));
            if (diffDays === streak) {
                streak++;
            }
            else if (diffDays === streak + 1) {
                if (streak === 0) {
                    streak = 1;
                }
                else {
                    break;
                }
            }
            else {
                break;
            }
        }
        return streak;
    }
    async calculateLongestStreak(userId) {
        const gratitudes = await this.prisma.gratitude.findMany({
            where: { userId },
            orderBy: { createdAt: 'asc' },
            select: { createdAt: true },
        });
        if (gratitudes.length === 0)
            return 0;
        let longestStreak = 1;
        let currentStreak = 1;
        let lastDate = new Date(gratitudes[0].createdAt);
        for (let i = 1; i < gratitudes.length; i++) {
            const currentDate = new Date(gratitudes[i].createdAt);
            const diffDays = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
            if (diffDays === 1) {
                currentStreak++;
            }
            else if (diffDays > 1) {
                longestStreak = Math.max(longestStreak, currentStreak);
                currentStreak = 1;
            }
            lastDate = currentDate;
        }
        return Math.max(longestStreak, currentStreak);
    }
    async checkAndAwardStreakBonus(userId) {
        const currentStreak = await this.calculateCurrentStreak(userId);
        if (currentStreak === 7) {
            await this.prisma.growthPoint.create({
                data: {
                    userId,
                    points: 25,
                    source: 'weekly_streak',
                },
            });
        }
        else if (currentStreak === 30) {
            await this.prisma.growthPoint.create({
                data: {
                    userId,
                    points: 100,
                    source: 'monthly_streak',
                },
            });
        }
        else if (currentStreak === 100) {
            await this.prisma.growthPoint.create({
                data: {
                    userId,
                    points: 500,
                    source: 'century_streak',
                },
            });
        }
    }
};
exports.GratitudeService = GratitudeService;
exports.GratitudeService = GratitudeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        ai_service_1.AIService])
], GratitudeService);
//# sourceMappingURL=gratitude.service.js.map