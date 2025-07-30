import { User } from './user.entity';
import { VisionBoardItem } from './vision-board-item.entity';
export declare class VisionBoard {
    id: string;
    title: string;
    description: string;
    isPublic: boolean;
    layout: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    items: VisionBoardItem[];
}
