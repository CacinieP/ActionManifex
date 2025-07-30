import { IsString, IsEnum, IsOptional, IsArray } from 'class-validator';

export class CreateGratitudeDto {
  @IsString()
  content: string;

  @IsOptional()
  @IsEnum(['text', 'image', 'audio'])
  type?: string;

  @IsOptional()
  @IsString()
  mediaUrl?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  mood?: string;
}

export class UpdateGratitudeDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  mood?: string;
}