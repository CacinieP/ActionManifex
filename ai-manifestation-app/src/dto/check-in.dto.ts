import { IsString, IsEnum, IsOptional, IsNumber } from 'class-validator';

export class CreateCheckInDto {
  @IsEnum(['text', 'image', 'audio'])
  type: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  mediaUrl?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  mood?: string;

  @IsOptional()
  @IsNumber()
  progress?: number;

  @IsString()
  goalId: string;
}

export class UpdateCheckInDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  mood?: string;

  @IsOptional()
  @IsNumber()
  progress?: number;
}