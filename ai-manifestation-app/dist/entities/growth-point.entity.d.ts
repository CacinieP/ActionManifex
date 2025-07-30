import { User } from './user.entity';
export declare class GrowthPoint {
    id: string;
    points: number;
    source: string;
    sourceId: string;
    createdAt: Date;
    user: User;
}
