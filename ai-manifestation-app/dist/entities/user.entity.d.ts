import { Wish } from './wish.entity';
import { Goal } from './goal.entity';
import { Gratitude } from './gratitude.entity';
import { CheckIn } from './check-in.entity';
import { Reward } from './reward.entity';
import { GrowthPoint } from './growth-point.entity';
import { VisionBoard } from './vision-board.entity';
export declare class User {
    id: string;
    email: string;
    username: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
    wishes: Wish[];
    goals: Goal[];
    gratitudes: Gratitude[];
    checkIns: CheckIn[];
    rewards: Reward[];
    growthPoints: GrowthPoint[];
    visionBoards: VisionBoard[];
}
