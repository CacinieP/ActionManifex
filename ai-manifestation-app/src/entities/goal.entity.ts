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
import { Wish } from './wish.entity';
import { CheckIn } from './check-in.entity';

export class Goal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  type: string;

  @Column({ default: 'pending' })
  status: string;

  @Column({ default: 'medium' })
  priority: string;

  @Column({ nullable: true })
  dueDate: Date;

  @Column({ nullable: true })
  completedAt: Date;

  @Column({ type: 'int', default: 0 })
  progress: number;

  @Column({ type: 'int' })
  order: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // SMART criteria
  @Column({ nullable: true })
  specific: string;

  @Column({ nullable: true })
  measurable: string;

  @Column({ nullable: true })
  achievable: string;

  @Column({ nullable: true })
  relevant: string;

  @Column({ nullable: true })
  timeBound: string;

  // Relations
  @ManyToOne(() => Wish, wish => wish.goals)
  wish: Wish;

  @ManyToOne(() => User, user => user.goals)
  user: User;

  @OneToMany(() => CheckIn, checkIn => checkIn.goal)
  checkIns: CheckIn[];
}