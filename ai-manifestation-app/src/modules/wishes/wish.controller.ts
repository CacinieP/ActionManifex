import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Request,
  UseGuards
} from '@nestjs/common';
import { WishService } from './wish.service';
import { CreateWishDto, UpdateWishDto, OptimizeWishDto } from '../../dto/wish.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('wishes')
@Controller('wishes')
export class WishController {
  constructor(private readonly wishService: WishService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new wish' })
  @ApiResponse({ status: 201, description: 'Wish successfully created' })
  create(@Body() createWishDto: CreateWishDto, @Request() req) {
    return this.wishService.create(createWishDto, req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user wishes' })
  findAll(@Request() req) {
    return this.wishService.findAll(req.user.userId);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get wish statistics' })
  getWishStats(@Request() req) {
    return this.wishService.getWishStats(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get wish by ID' })
  @ApiResponse({ status: 200, description: 'Wish found' })
  @ApiResponse({ status: 404, description: 'Wish not found' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.wishService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update wish' })
  update(@Param('id') id: string, @Body() updateWishDto: UpdateWishDto, @Request() req) {
    return this.wishService.update(id, updateWishDto, req.user.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete wish' })
  remove(@Param('id') id: string, @Request() req) {
    return this.wishService.remove(id, req.user.userId);
  }

  @Post(':id/optimize')
  @ApiOperation({ summary: 'Optimize wish using AI' })
  optimizeWish(@Param('id') id: string, @Body() optimizeDto: OptimizeWishDto, @Request() req) {
    return this.wishService.optimizeWish(
      { ...optimizeDto, wishId: id },
      req.user.userId
    );
  }

  @Post(':id/generate-image')
  @ApiOperation({ summary: 'Generate image for wish using AI' })
  generateImage(@Param('id') id: string, @Request() req) {
    return this.wishService.generateImageForWish(id, req.user.userId);
  }
}