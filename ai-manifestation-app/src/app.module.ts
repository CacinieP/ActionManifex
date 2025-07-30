import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { WishModule } from './modules/wishes/wish.module';
import { GoalModule } from './modules/goals/goal.module';
import { GratitudeModule } from './modules/gratitude/gratitude.module';
import { AIModule } from './ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    UserModule,
    WishModule,
    GoalModule,
    GratitudeModule,
    AIModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}