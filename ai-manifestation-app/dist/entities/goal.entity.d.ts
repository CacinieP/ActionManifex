import { User } from './user.entity';
import { Wish } from './wish.entity';
import { CheckIn } from './check-in.entity';
export declare class Goal {
    id: string;
    title: string;
    description: string;
    type: string;
    status: string;
    priority: string;
    dueDate: Date;
    completedAt: Date;
    progress: number;
    order: number;
    createdAt: Date;
    updatedAt: Date;
    specific: string;
    measurable: string;
    achievable: string;
    relevant: string;
    timeBound: string;
    wish: Wish;
    user: User;
    checkIns: CheckIn[];
}
