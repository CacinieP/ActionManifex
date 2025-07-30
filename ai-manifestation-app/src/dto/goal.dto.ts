import { 
  IsString, 
  IsEnum, 
  IsOptional, 
  IsNumber, 
  IsDate, 
  IsArray,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateGoalDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(['smart_goal', 'milestone', 'task'])
  type: string;

  @IsOptional()
  @IsEnum(['low', 'medium', 'high'])
  priority?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dueDate?: Date;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsOptional()
  @IsString()
  specific?: string;

  @IsOptional()
  @IsString()
  measurable?: string;

  @IsOptional()
  @IsString()
  achievable?: string;

  @IsOptional()
  @IsString()
  relevant?: string;

  @IsOptional()
  @IsString()
  timeBound?: string;

  @IsString()
  wishId: string;
}

export class UpdateGoalDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(['pending', 'in_progress', 'completed', 'cancelled'])
  status?: string;

  @IsOptional()
  @IsEnum(['low', 'medium', 'high'])
  priority?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dueDate?: Date;

  @IsOptional()
  @IsNumber()
  progress?: number;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsOptional()
  @IsString()
  specific?: string;

  @IsOptional()
  @IsString()
  measurable?: string;

  @IsOptional()
  @IsString()
  achievable?: string;

  @IsOptional()
  @IsString()
  relevant?: string;

  @IsOptional()
  @IsString()
  timeBound?: string;
}

export class GenerateGoalsDto {
  @IsString()
  wishId: string;

  @IsOptional()
  @IsNumber()
  count?: number; // Number of goals to generate (default 3-5)
}

export class BulkGoalUpdateDto {
  @IsArray()
  @ValidateNested({ each: true })
  goals: UpdateGoalDto[];
}