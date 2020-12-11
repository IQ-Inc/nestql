import { IOperation } from '@nestql/common';
import { AddTagDto, AddTodoDto, GetUserDto } from './dtos';
import { Todo, User } from './models';

export interface ExampleTodoAppOperations {
  getAllUsers: IOperation<User[]>;
  getUser: IOperation<User, GetUserDto>;
  addTodo: IOperation<Todo, AddTodoDto>;
  addTag: IOperation<Todo, AddTagDto>;
}
