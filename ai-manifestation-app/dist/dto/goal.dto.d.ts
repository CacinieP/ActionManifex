export declare class CreateGoalDto {
    title: string;
    description?: string;
    type: string;
    priority?: string;
    dueDate?: Date;
    order?: number;
    specific?: string;
    measurable?: string;
    achievable?: string;
    relevant?: string;
    timeBound?: string;
    wishId: string;
}
export declare class UpdateGoalDto {
    title?: string;
    description?: string;
    status?: string;
    priority?: string;
    dueDate?: Date;
    progress?: number;
    order?: number;
    specific?: string;
    measurable?: string;
    achievable?: string;
    relevant?: string;
    timeBound?: string;
}
export declare class GenerateGoalsDto {
    wishId: string;
    count?: number;
}
export declare class BulkGoalUpdateDto {
    goals: UpdateGoalDto[];
}
