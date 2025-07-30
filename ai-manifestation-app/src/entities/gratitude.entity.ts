import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  ManyToOne 
} from 'typeorm';
import { User } from './user.entity';

export class Gratitude {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column({ default: 'text' })
  type: string;

  @Column({ nullable: true })
  mediaUrl: string;

  @Column('simple-array')
  tags: string[];

  @Column({ nullable: true })
  mood: string;

  @Column({ nullable: true })
  aiQuote: string;

  @CreateDateColumn()
  createdAt: Date;

  // Relations
  @ManyToOne(() => User, user => user.gratitudes)
  user: User;
}