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
import { GratitudeService } from './gratitude.service';
import { CreateGratitudeDto, UpdateGratitudeDto } from '../../dto/gratitude.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('gratitude')
@Controller('gratitude')
export class GratitudeController {
  constructor(private readonly gratitudeService: GratitudeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new gratitude entry' })
  create(@Body() createGratitudeDto: CreateGratitudeDto, @Request() req) {
    return this.gratitudeService.create(createGratitudeDto, req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all gratitude entries' })
  findAll(@Request() req, @Query('limit') limit?: string) {
    return this.gratitudeService.findAll(req.user.userId, limit ? parseInt(limit) : undefined);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get gratitude statistics' })
  getGratitudeStats(@Request() req) {
    return this.gratitudeService.getGratitudeStats(req.user.userId);
  }

  @Get('calendar')
  @ApiOperation({ summary: 'Get gratitude calendar data' })
  getGratitudeCalendar(
    @Request() req,
    @Query('year') year?: string,
    @Query('month') month?: string
  ) {
    return this.gratitudeService.getGratitudeCalendar(
      req.user.userId,
      year ? parseInt(year) : undefined,
      month ? parseInt(month) : undefined
    );
  }

  @Get('daily-prompt')
  @ApiOperation({ summary: 'Get daily gratitude prompt' })
  getDailyGratitudePrompt(@Request() req) {
    return this.gratitudeService.getDailyGratitudePrompt(req.user.userId);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search gratitude entries' })
  searchGratitudes(@Query('q') query: string, @Request() req) {
    return this.gratitudeService.searchGratitudes(req.user.userId, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get gratitude entry by ID' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.gratitudeService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update gratitude entry' })
  update(@Param('id') id: string, @Body() updateGratitudeDto: UpdateGratitudeDto, @Request() req) {
    return this.gratitudeService.update(id, updateGratitudeDto, req.user.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete gratitude entry' })
  remove(@Param('id') id: string, @Request() req) {
    return this.gratitudeService.remove(id, req.user.userId);
  }
}