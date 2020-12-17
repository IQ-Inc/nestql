import { IManyToMany, IManyToOne } from '@nestql/common';
import { IsNotEmpty, IsString } from 'class-validator';
import { Tag } from './tag.model';
import { User } from './user.model';

export interface Todo {
  id: string;
  title: string;
  content: string;
  dateCreated: Date;
  ownedBy: IManyToOne<Todo, User>;
  tags: IManyToMany<Todo, Tag>;
}

export abstract class AddTodoDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  content!: string;

  @IsNotEmpty()
  @IsString()
  userId!: string;
}

export abstract class GetMyTodosDto {
  @IsNotEmpty()
  @IsString()
  userId!: string;
}

export abstract class GetTodo {
  @IsNotEmpty()
  @IsString()
  todoId!: string;
}
