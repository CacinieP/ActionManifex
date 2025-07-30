import { ConfigService } from '@nestjs/config';
export declare class AIService {
    private configService;
    private readonly apiKey;
    private readonly apiUrl;
    constructor(configService: ConfigService);
    optimizeWish(title: string, description?: string, focus?: string): Promise<string>;
    generateImage(text: string, keywords: string[]): Promise<string>;
    generateSMARTGoals(wishText: string): Promise<any[]>;
    generateInspirationQuote(context: string): Promise<string>;
    analyzeGratitudeSentiment(content: string): Promise<{
        mood: string;
        keywords: string[];
        score: number;
    }>;
}
