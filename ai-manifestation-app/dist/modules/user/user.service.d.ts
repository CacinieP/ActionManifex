import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from '../../dto/user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        email: string;
        username: string | null;
        avatar: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<({
        wishes: {
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
        }[];
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
        gratitudes: {
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
    } & {
        email: string;
        username: string | null;
        avatar: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        wishes: ({
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
        })[];
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
        gratitudes: {
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
        rewards: {
            id: string;
            createdAt: Date;
            points: number;
            userId: string;
            title: string;
            description: string;
            type: string;
            content: string | null;
            category: string;
            isClaimed: boolean;
            claimedAt: Date | null;
        }[];
        growthPoints: {
            id: string;
            createdAt: Date;
            points: number;
            source: string;
            sourceId: string | null;
            userId: string;
        }[];
        visionBoards: ({
            items: {
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
            isPublic: boolean;
            layout: string;
        })[];
    } & {
        email: string;
        username: string | null;
        avatar: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByEmail(email: string): Promise<{
        email: string;
        username: string | null;
        avatar: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        email: string;
        username: string | null;
        avatar: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        email: string;
        username: string | null;
        avatar: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getUserStats(id: string): Promise<{
        totalPoints: number;
        activeGoals: number;
        completedGoals: number;
        totalGratitudeDays: number;
        wishCount: number;
        recentActivity: {
            lastWish: Date;
            lastCheckIn: Date;
            lastGratitude: Date;
        };
    }>;
}
