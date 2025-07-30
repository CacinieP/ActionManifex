import { PrismaService } from '../../prisma/prisma.service';
import { CreateGratitudeDto, UpdateGratitudeDto } from '../../dto/gratitude.dto';
import { AIService } from '../../ai/ai.service';
export declare class GratitudeService {
    private prisma;
    private aiService;
    constructor(prisma: PrismaService, aiService: AIService);
    create(createGratitudeDto: CreateGratitudeDto, userId: string): Promise<{
        user: {
            email: string;
            username: string | null;
            avatar: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        type: string;
        content: string;
        mediaUrl: string | null;
        tags: string[];
        mood: string | null;
        aiQuote: string | null;
    }>;
    findAll(userId: string, limit?: number): Promise<({
        user: {
            email: string;
            username: string | null;
            avatar: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        type: string;
        content: string;
        mediaUrl: string | null;
        tags: string[];
        mood: string | null;
        aiQuote: string | null;
    })[]>;
    findOne(id: string, userId: string): Promise<{
        user: {
            email: string;
            username: string | null;
            avatar: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        type: string;
        content: string;
        mediaUrl: string | null;
        tags: string[];
        mood: string | null;
        aiQuote: string | null;
    }>;
    update(id: string, updateGratitudeDto: UpdateGratitudeDto, userId: string): Promise<{
        user: {
            email: string;
            username: string | null;
            avatar: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        type: string;
        content: string;
        mediaUrl: string | null;
        tags: string[];
        mood: string | null;
        aiQuote: string | null;
    }>;
    remove(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        type: string;
        content: string;
        mediaUrl: string | null;
        tags: string[];
        mood: string | null;
        aiQuote: string | null;
    }>;
    getGratitudeStats(userId: string): Promise<{
        totalEntries: number;
        currentStreak: number;
        longestStreak: number;
        thisMonthEntries: number;
        moodCounts: {};
        topTags: string[];
        recentActivity: {
            id: string;
            createdAt: Date;
            userId: string;
            type: string;
            content: string;
            mediaUrl: string | null;
            tags: string[];
            mood: string | null;
            aiQuote: string | null;
        }[];
    }>;
    getGratitudeCalendar(userId: string, year?: number, month?: number): Promise<{
        month: number;
        year: number;
        calendar: {};
        totalDays: number;
    }>;
    getDailyGratitudePrompt(userId: string): Promise<{
        prompt: string;
        hasTodayEntry: boolean;
        suggestions: string[];
    }>;
    searchGratitudes(userId: string, query: string): Promise<({
        user: {
            email: string;
            username: string | null;
            avatar: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        type: string;
        content: string;
        mediaUrl: string | null;
        tags: string[];
        mood: string | null;
        aiQuote: string | null;
    })[]>;
    private calculateCurrentStreak;
    private calculateLongestStreak;
    private checkAndAwardStreakBonus;
}
