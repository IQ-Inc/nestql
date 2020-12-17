import { IOneToMany, IOneToOne } from '@nestql/common';
import { IsNotEmpty, IsString } from 'class-validator';
import { Todo } from './todo.model';

export interface User {
  id: string;
  name: string;
  todos: IOneToMany<User, Todo>;
  privateProfile?: IOneToOne<User, UserPrivate>;
}

export interface UserPrivate {
  id: string;
  birthday: Date;
  publicProfile: IOneToOne<UserPrivate, User>;
}

export abstract class GetUserDto {
  @IsNotEmpty()
  @IsString()
  userId!: string;
}
