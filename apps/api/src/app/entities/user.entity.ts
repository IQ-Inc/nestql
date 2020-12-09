import { IOneToMany, IOneToOne } from '@nestql/common';
import { Todo, User, UserPrivate } from '@nestql/example-domain';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { TodoEntity } from './todo.entity';
import { UserPrivateEntity } from './user-private.entity';

@Entity({ name: 'User' })
export class UserEntity implements Required<User> {
  @PrimaryColumn('text')
  id!: string;

  @Column()
  name!: string;

  @OneToMany(() => TodoEntity, (e) => e.ownedBy)
  todos!: IOneToMany<User, Todo>;

  @OneToOne(() => UserPrivateEntity, { nullable: true })
  @JoinColumn() // !Important to join columns on both entities.
  privateProfile!: IOneToOne<User, UserPrivate>;
}
