import {
  ClientOperation,
  ClientSubscription,
  IClientOperations,
  IClientSubscriptions,
} from '@nestql/angular';
import { IClientOperation, IClientSubscription } from '@nestql/common';
import {
  AddTagDto,
  AddTodoDto,
  ExampleTodoAppOperations,
  ExampleTodoAppSubscriptions,
  GetMyTodosDto,
  GetTodo,
  GetUserDto,
  Todo,
  User,
} from '@nestql/example-domain';

export class ApiOperations implements IClientOperations<ExampleTodoAppOperations> {
  @ClientOperation()
  getAllUsers!: IClientOperation<User[]>;
  @ClientOperation()
  getUser!: IClientOperation<User, GetUserDto>;
  @ClientOperation()
  addTodo!: IClientOperation<Todo, AddTodoDto>;
  @ClientOperation()
  addTag!: IClientOperation<Todo, AddTagDto>;
}

export class ApiSubscriptions implements IClientSubscriptions<ExampleTodoAppSubscriptions> {
  @ClientSubscription()
  subMyTodos!: IClientSubscription<Todo[], GetMyTodosDto>;
  @ClientSubscription()
  subTodo!: IClientSubscription<Todo[], GetTodo>;
}
