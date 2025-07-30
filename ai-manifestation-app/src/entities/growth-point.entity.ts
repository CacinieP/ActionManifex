import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  ManyToOne 
} from 'typeorm';
import { User } from './user.entity';

export class GrowthPoint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  points: number;

  @Column()
  source: string;

  @Column({ nullable: true })
  sourceId: string;

  @CreateDateColumn()
  createdAt: Date;

  // Relations
  @ManyToOne(() => User, user => user.growthPoints)
  user: User;
}