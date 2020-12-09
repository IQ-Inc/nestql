import { IOneToOne } from '@nestql/common';
import { User, UserPrivate } from '@nestql/example-domain';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'UserPrivate' })
export class UserPrivateEntity implements Required<UserPrivate> {
  @PrimaryColumn('text')
  id!: string;

  @Column()
  birthday!: Date;

  @OneToOne(() => UserEntity)
  @JoinColumn() // !Important to join columns on both entities.
  publicProfile!: IOneToOne<UserPrivate, User>;
}
