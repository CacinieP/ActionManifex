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
import { VisionBoardItem } from './vision-board-item.entity';

export class VisionBoard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  isPublic: boolean;

  @Column({ default: 'grid' })
  layout: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, user => user.visionBoards)
  user: User;

  @OneToMany(() => VisionBoardItem, item => item.visionBoard)
  items: VisionBoardItem[];
}