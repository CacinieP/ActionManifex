import { User } from './user.entity';
import { Goal } from './goal.entity';
export declare class CheckIn {
    id: string;
    type: string;
    content: string;
    mediaUrl: string;
    notes: string;
    mood: string;
    progress: number;
    createdAt: Date;
    goal: Goal;
    user: User;
}
