export declare class CreateWishDto {
    title: string;
    description?: string;
    category: string;
    keywords?: string[];
    priority?: string;
}
export declare class UpdateWishDto {
    title?: string;
    description?: string;
    category?: string;
    keywords?: string[];
    status?: string;
    priority?: string;
}
export declare class OptimizeWishDto {
    wishId: string;
    focus?: string;
}
