import { IManyToOne } from '@nestql/common';
import { IsNotEmpty, IsString } from 'class-validator';
import { Todo, User } from './models';

export abstract class GetUserDto {
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

export abstract class AddTagDto {
  @IsNotEmpty()
  @IsString()
  todoId!: string;

  @IsNotEmpty()
  @IsString()
  text!: string;
}
