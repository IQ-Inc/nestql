import { IManyToMany } from '@nestql/common';
import { Tag, Todo } from '@nestql/example-domain';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { TodoEntity } from './todo.entity';

@Entity({ name: 'Tag' })
export class TagEntity implements Required<Tag> {
  @PrimaryColumn('text')
  id!: string;

  @Column()
  text!: string;

  @ManyToMany(() => TodoEntity, (e) => e.tags)
  @JoinTable() // !Important to join columns on both entities.
  todos!: IManyToMany<Tag, Todo>;
}
