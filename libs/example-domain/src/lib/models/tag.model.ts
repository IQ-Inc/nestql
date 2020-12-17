import { IManyToMany } from '@nestql/common';
import { IsNotEmpty, IsString } from 'class-validator';
import { Todo } from './todo.model';

export interface Tag {
  id: string;
  text: string;
  todos: IManyToMany<Tag, Todo>;
}

export abstract class AddTagDto {
  @IsNotEmpty()
  @IsString()
  todoId!: string;

  @IsNotEmpty()
  @IsString()
  text!: string;
}
