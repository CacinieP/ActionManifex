import { Module } from '@nestjs/common';
import { WishService } from './wish.service';
import { WishController } from './wish.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { AIModule } from '../../ai/ai.module';

@Module({
  imports: [PrismaModule, AIModule],
  controllers: [WishController],
  providers: [WishService],
  exports: [WishService],
})
export class WishModule {}