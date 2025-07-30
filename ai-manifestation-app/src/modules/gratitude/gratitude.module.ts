import { Module } from '@nestjs/common';
import { GratitudeService } from './gratitude.service';
import { GratitudeController } from './gratitude.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { AIModule } from '../../ai/ai.module';

@Module({
  imports: [PrismaModule, AIModule],
  controllers: [GratitudeController],
  providers: [GratitudeService],
  exports: [GratitudeService],
})
export class GratitudeModule {}