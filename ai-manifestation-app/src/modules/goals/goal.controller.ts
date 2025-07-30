import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Request,
  Query
} from '@nestjs/common';
import { GoalService } from './goal.service';
import { CreateGoalDto, UpdateGoalDto, GenerateGoalsDto } from '../../dto/goal.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('goals')
@Controller('goals')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new goal' })
  create(@Body() createGoalDto: CreateGoalDto, @Request() req) {
    return this.goalService.create(createGoalDto, req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user goals' })
  findAll(@Request() req) {
    return this.goalService.findAll(req.user.userId);
  }

  @Get('upcoming')
  @ApiOperation({ summary: 'Get upcoming goals (next 7 days)' })
  getUpcomingGoals(@Request() req) {
    return this.goalService.getUpcomingGoals(req.user.userId);
  }

  @Get('wish/:wishId/progress')
  @ApiOperation({ summary: 'Get goal progress for a specific wish' })
  getGoalProgress(@Param('wishId') wishId: string, @Request() req) {
    return this.goalService.getGoalProgress(wishId, req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get goal by ID' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.goalService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update goal' })
  update(@Param('id') id: string, @Body() updateGoalDto: UpdateGoalDto, @Request() req) {
    return this.goalService.update(id, updateGoalDto, req.user.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete goal' })
  remove(@Param('id') id: string, @Request() req) {
    return this.goalService.remove(id, req.user.userId);
  }

  @Post('generate-smart')
  @ApiOperation({ summary: 'Generate SMART goals using AI' })
  generateSMARTGoals(@Body() generateGoalsDto: GenerateGoalsDto, @Request() req) {
    return this.goalService.generateSMARTGoals(generateGoalsDto, req.user.userId);
  }

  @Patch('wish/:wishId/reorder')
  @ApiOperation({ summary: 'Reorder goals within a wish' })
  reorderGoals(
    @Param('wishId') wishId: string, 
    @Body('goalIds') goalIds: string[], 
    @Request() req
  ) {
    return this.goalService.reorderGoals(wishId, goalIds, req.user.userId);
  }
}