import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50 })
  author: string;

  @Column({ type: "varchar", length: 100 })
  title: string;

  @CreateDateColumn()
  publishedAt: Date;
}
