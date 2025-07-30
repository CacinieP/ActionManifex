export declare class CreateCheckInDto {
    type: string;
    content: string;
    mediaUrl?: string;
    notes?: string;
    mood?: string;
    progress?: number;
    goalId: string;
}
export declare class UpdateCheckInDto {
    content?: string;
    notes?: string;
    mood?: string;
    progress?: number;
}
