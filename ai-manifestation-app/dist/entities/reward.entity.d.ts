import { User } from './user.entity';
export declare class Reward {
    id: string;
    type: string;
    title: string;
    description: string;
    content: string;
    points: number;
    category: string;
    isClaimed: boolean;
    claimedAt: Date;
    createdAt: Date;
    user: User;
}
