import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  completed: boolean;
}