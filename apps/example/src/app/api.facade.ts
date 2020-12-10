import { ClientOperation, IClientOperations } from '@nestql/angular';
import { IClientOperation } from '@nestql/common';
import { AddTagDto, AddTodoDto, ExampleAppOperations, GetUserDto, Todo, User } from '@nestql/example-domain';

export class ApiFacadeService implements IClientOperations<ExampleAppOperations> {
  @ClientOperation()
  getAllUsers!: IClientOperation<User[]>;

  @ClientOperation()
  getUser!: IClientOperation<User, GetUserDto>;

  @ClientOperation()
  addTodo!: IClientOperation<Todo, AddTodoDto>;

  @ClientOperation()
  addTag!: IClientOperation<Todo, AddTagDto>;
}
