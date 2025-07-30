import { User } from './user.entity';
export declare class Gratitude {
    id: string;
    content: string;
    type: string;
    mediaUrl: string;
    tags: string[];
    mood: string;
    aiQuote: string;
    createdAt: Date;
    user: User;
}
