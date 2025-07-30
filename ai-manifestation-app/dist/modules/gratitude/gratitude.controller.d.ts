import { GratitudeService } from './gratitude.service';
import { CreateGratitudeDto, UpdateGratitudeDto } from '../../dto/gratitude.dto';
export declare class GratitudeController {
    private readonly gratitudeService;
    constructor(gratitudeService: GratitudeService);
    create(createGratitudeDto: CreateGratitudeDto, req: any): Promise<{
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
    findAll(req: any, limit?: string): Promise<({
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
    getGratitudeStats(req: any): Promise<{
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
    getGratitudeCalendar(req: any, year?: string, month?: string): Promise<{
        month: number;
        year: number;
        calendar: {};
        totalDays: number;
    }>;
    getDailyGratitudePrompt(req: any): Promise<{
        prompt: string;
        hasTodayEntry: boolean;
        suggestions: string[];
    }>;
    searchGratitudes(query: string, req: any): Promise<({
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
    findOne(id: string, req: any): Promise<{
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
    update(id: string, updateGratitudeDto: UpdateGratitudeDto, req: any): Promise<{
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
    remove(id: string, req: any): Promise<{
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
}
