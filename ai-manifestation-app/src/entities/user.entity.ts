import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Wish } from './wish.entity';
import { Goal } from './goal.entity';
import { Gratitude } from './gratitude.entity';
import { CheckIn } from './check-in.entity';
import { Reward } from './reward.entity';
import { GrowthPoint } from './growth-point.entity';
import { VisionBoard } from './vision-board.entity';

export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  avatar: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToMany(() => Wish, wish => wish.user)
  wishes: Wish[];

  @OneToMany(() => Goal, goal => goal.user)
  goals: Goal[];

  @OneToMany(() => Gratitude, gratitude => gratitude.user)
  gratitudes: Gratitude[];

  @OneToMany(() => CheckIn, checkIn => checkIn.user)
  checkIns: CheckIn[];

  @OneToMany(() => Reward, reward => reward.user)
  rewards: Reward[];

  @OneToMany(() => GrowthPoint, growthPoint => growthPoint.user)
  growthPoints: GrowthPoint[];

  @OneToMany(() => VisionBoard, visionBoard => visionBoard.user)
  visionBoards: VisionBoard[];
}