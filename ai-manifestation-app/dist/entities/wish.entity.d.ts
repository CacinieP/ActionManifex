import { User } from './user.entity';
import { Goal } from './goal.entity';
import { VisionBoardItem } from './vision-board-item.entity';
export declare class Wish {
    id: string;
    title: string;
    description: string;
    category: string;
    isOptimized: boolean;
    optimizedText: string;
    keywords: string[];
    status: string;
    priority: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    goals: Goal[];
    visionBoardItems: VisionBoardItem[];
}
