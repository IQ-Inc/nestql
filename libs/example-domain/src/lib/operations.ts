import { IOperation } from '@nestql/common';
import { AddTodoDto, GetUserDto, Todo, User } from './models';
import { AddTagDto } from './models/tag.model';

export interface ExampleTodoAppOperations {
  getAllUsers: IOperation<User[]>;
  getUser: IOperation<User, GetUserDto>;
  addTodo: IOperation<Todo, AddTodoDto>;
  addTag: IOperation<Todo, AddTagDto>;
}
