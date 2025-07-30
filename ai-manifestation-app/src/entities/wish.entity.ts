import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  ManyToOne, 
  OneToMany 
} from 'typeorm';
import { User } from './user.entity';
import { Goal } from './goal.entity';
import { VisionBoardItem } from './vision-board-item.entity';

export class Wish {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  category: string;

  @Column({ default: false })
  isOptimized: boolean;

  @Column({ nullable: true })
  optimizedText: string;

  @Column('simple-array')
  keywords: string[];

  @Column({ default: 'active' })
  status: string;

  @Column({ default: 'medium' })
  priority: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, user => user.wishes)
  user: User;

  @OneToMany(() => Goal, goal => goal.wish)
  goals: Goal[];

  @OneToMany(() => VisionBoardItem, item => item.wish)
  visionBoardItems: VisionBoardItem[];
}