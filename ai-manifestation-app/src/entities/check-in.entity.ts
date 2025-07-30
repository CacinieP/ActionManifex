import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  ManyToOne 
} from 'typeorm';
import { User } from './user.entity';
import { Goal } from './goal.entity';

export class CheckIn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  mediaUrl: string;

  @Column({ nullable: true })
  notes: string;

  @Column({ nullable: true })
  mood: string;

  @Column({ type: 'int', default: 0 })
  progress: number;

  @CreateDateColumn()
  createdAt: Date;

  // Relations
  @ManyToOne(() => Goal, goal => goal.checkIns)
  goal: Goal;

  @ManyToOne(() => User, user => user.checkIns)
  user: User;
}