import { IsString, IsEnum, IsOptional, IsArray, IsBoolean } from 'class-validator';

export class CreateWishDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(['健康', '事业', '财富', '家庭', '学习', '旅行', '爱情', '其他'])
  category: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keywords?: string[];

  @IsOptional()
  @IsEnum(['low', 'medium', 'high'])
  priority?: string;
}

export class UpdateWishDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(['健康', '事业', '财富', '家庭', '学习', '旅行', '爱情', '其他'])
  category?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keywords?: string[];

  @IsOptional()
  @IsEnum(['active', 'completed', 'paused'])
  status?: string;

  @IsOptional()
  @IsEnum(['low', 'medium', 'high'])
  priority?: string;
}

export class OptimizeWishDto {
  @IsString()
  wishId: string;

  @IsOptional()
  @IsString()
  focus?: string; // Specific focus for optimization
}