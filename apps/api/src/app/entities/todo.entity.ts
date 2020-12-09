import { IManyToMany, IManyToOne } from '@nestql/common';
import { Tag, Todo, User } from '@nestql/example-domain';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { TagEntity } from './tag.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'Todo' })
export class TodoEntity implements Required<Todo> {
  @PrimaryColumn('text')
  id!: string;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column()
  dateCreated!: Date;

  @ManyToOne(() => UserEntity, (e) => e.todos)
  ownedBy!: IManyToOne<Todo, User>;

  @ManyToMany(() => TagEntity, (e) => e.todos)
  @JoinTable() // !Important to join columns on both entities.
  tags!: IManyToMany<Todo, Tag>;
}
