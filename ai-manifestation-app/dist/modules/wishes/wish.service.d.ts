import { PrismaService } from '../../prisma/prisma.service';
import { CreateWishDto, UpdateWishDto, OptimizeWishDto } from '../../dto/wish.dto';
import { AIService } from '../../ai/ai.service';
export declare class WishService {
    private prisma;
    private aiService;
    constructor(prisma: PrismaService, aiService: AIService);
    create(createWishDto: CreateWishDto, userId: string): Promise<{
        user: {
            email: string;
            username: string | null;
            avatar: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
        goals: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            title: string;
            description: string | null;
            type: string;
            status: string;
            priority: string;
            dueDate: Date | null;
            completedAt: Date | null;
            progress: number;
            order: number;
            specific: string | null;
            measurable: string | null;
            achievable: string | null;
            relevant: string | null;
            timeBound: string | null;
            wishId: string;
        }[];
        visionBoardItems: {
            id: string;
            createdAt: Date;
            title: string | null;
            type: string;
            order: number;
            wishId: string | null;
            content: string;
            imageUrl: string | null;
            positionX: number;
            positionY: number;
            width: number;
            height: number;
            visionBoardId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        title: string;
        description: string | null;
        status: string;
        priority: string;
        category: string;
        isOptimized: boolean;
        optimizedText: string | null;
        keywords: string[];
    }>;
    findAll(userId: string): Promise<({
        user: {
            email: string;
            username: string | null;
            avatar: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
        goals: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            title: string;
            description: string | null;
            type: string;
            status: string;
            priority: string;
            dueDate: Date | null;
            completedAt: Date | null;
            progress: number;
            order: number;
            specific: string | null;
            measurable: string | null;
            achievable: string | null;
            relevant: string | null;
            timeBound: string | null;
            wishId: string;
        }[];
        visionBoardItems: {
            id: string;
            createdAt: Date;
            title: string | null;
            type: string;
            order: number;
            wishId: string | null;
            content: string;
            imageUrl: string | null;
            positionX: number;
            positionY: number;
            width: number;
            height: number;
            visionBoardId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        title: string;
        description: string | null;
        status: string;
        priority: string;
        category: string;
        isOptimized: boolean;
        optimizedText: string | null;
        keywords: string[];
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
        goals: ({
            checkIns: {
                id: string;
                createdAt: Date;
                userId: string;
                type: string;
                progress: number;
                content: string;
                mediaUrl: string | null;
                mood: string | null;
                notes: string | null;
                goalId: string;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            title: string;
            description: string | null;
            type: string;
            status: string;
            priority: string;
            dueDate: Date | null;
            completedAt: Date | null;
            progress: number;
            order: number;
            specific: string | null;
            measurable: string | null;
            achievable: string | null;
            relevant: string | null;
            timeBound: string | null;
            wishId: string;
        })[];
        visionBoardItems: {
            id: string;
            createdAt: Date;
            title: string | null;
            type: string;
            order: number;
            wishId: string | null;
            content: string;
            imageUrl: string | null;
            positionX: number;
            positionY: number;
            width: number;
            height: number;
            visionBoardId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        title: string;
        description: string | null;
        status: string;
        priority: string;
        category: string;
        isOptimized: boolean;
        optimizedText: string | null;
        keywords: string[];
    }>;
    update(id: string, updateWishDto: UpdateWishDto, userId: string): Promise<{
        user: {
            email: string;
            username: string | null;
            avatar: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
        goals: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            title: string;
            description: string | null;
            type: string;
            status: string;
            priority: string;
            dueDate: Date | null;
            completedAt: Date | null;
            progress: number;
            order: number;
            specific: string | null;
            measurable: string | null;
            achievable: string | null;
            relevant: string | null;
            timeBound: string | null;
            wishId: string;
        }[];
        visionBoardItems: {
            id: string;
            createdAt: Date;
            title: string | null;
            type: string;
            order: number;
            wishId: string | null;
            content: string;
            imageUrl: string | null;
            positionX: number;
            positionY: number;
            width: number;
            height: number;
            visionBoardId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        title: string;
        description: string | null;
        status: string;
        priority: string;
        category: string;
        isOptimized: boolean;
        optimizedText: string | null;
        keywords: string[];
    }>;
    remove(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        title: string;
        description: string | null;
        status: string;
        priority: string;
        category: string;
        isOptimized: boolean;
        optimizedText: string | null;
        keywords: string[];
    }>;
    optimizeWish(optimizeWishDto: OptimizeWishDto, userId: string): Promise<{
        user: {
            email: string;
            username: string | null;
            avatar: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
        goals: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            title: string;
            description: string | null;
            type: string;
            status: string;
            priority: string;
            dueDate: Date | null;
            completedAt: Date | null;
            progress: number;
            order: number;
            specific: string | null;
            measurable: string | null;
            achievable: string | null;
            relevant: string | null;
            timeBound: string | null;
            wishId: string;
        }[];
        visionBoardItems: {
            id: string;
            createdAt: Date;
            title: string | null;
            type: string;
            order: number;
            wishId: string | null;
            content: string;
            imageUrl: string | null;
            positionX: number;
            positionY: number;
            width: number;
            height: number;
            visionBoardId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        title: string;
        description: string | null;
        status: string;
        priority: string;
        category: string;
        isOptimized: boolean;
        optimizedText: string | null;
        keywords: string[];
    }>;
    generateImageForWish(wishId: string, userId: string): Promise<{
        imageUrl: string;
    }>;
    getWishStats(userId: string): Promise<{
        totalWishes: number;
        activeWishes: number;
        completedWishes: number;
        optimizedWishes: number;
        categoryStats: {};
    }>;
    private extractKeywords;
}
