import { VisionBoard } from './vision-board.entity';
import { Wish } from './wish.entity';
export declare class VisionBoardItem {
    id: string;
    type: string;
    title: string;
    content: string;
    imageUrl: string;
    positionX: number;
    positionY: number;
    width: number;
    height: number;
    order: number;
    createdAt: Date;
    visionBoard: VisionBoard;
    wish: Wish;
}
