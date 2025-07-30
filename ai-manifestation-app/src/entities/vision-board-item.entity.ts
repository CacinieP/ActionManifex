import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  ManyToOne, 
  JoinColumn 
} from 'typeorm';
import { VisionBoard } from './vision-board.entity';
import { Wish } from './wish.entity';

export class VisionBoardItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  title: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ type: 'int', default: 0 })
  positionX: number;

  @Column({ type: 'int', default: 0 })
  positionY: number;

  @Column({ type: 'int', default: 200 })
  width: number;

  @Column({ type: 'int', default: 200 })
  height: number;

  @Column({ type: 'int' })
  order: number;

  @CreateDateColumn()
  createdAt: Date;

  // Relations
  @ManyToOne(() => VisionBoard, board => board.items)
  visionBoard: VisionBoard;

  @ManyToOne(() => Wish, wish => wish.visionBoardItems, { nullable: true })
  @JoinColumn()
  wish: Wish;
}