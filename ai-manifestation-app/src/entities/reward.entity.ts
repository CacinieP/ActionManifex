import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  ManyToOne 
} from 'typeorm';
import { User } from './user.entity';

export class Reward {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  content: string;

  @Column({ type: 'int', default: 0 })
  points: number;

  @Column()
  category: string;

  @Column({ default: false })
  isClaimed: boolean;

  @Column({ nullable: true })
  claimedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  // Relations
  @ManyToOne(() => User, user => user.rewards)
  user: User;
}