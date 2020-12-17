import { IQuery } from '@nestql/common';
import {
  AddTagDto,
  AddTodoDto,
  ExampleTodoAppOperations,
  GetMyTodosDto,
  GetUserDto,
  Todo,
  User,
} from '@nestql/example-domain';
import { IServerOperations, Operator, Dto, Query, ServerOperation } from '@nestql/nestjs';
import * as uuid from 'uuid';
import { TagRepository } from '../repositories/tag.repository';
import { TodoRepository } from '../repositories/todo.repository';
import { UserRepository } from '../repositories/user.repository';

@Operator()
export class ExampleAppOperator implements IServerOperations<ExampleTodoAppOperations> {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly todoRepo: TodoRepository,
    private readonly tagRepo: TagRepository
  ) {}

  @ServerOperation()
  async getAllUsers(@Query() query: IQuery<User[]>) {
    return this.userRepo.paginate(query);
  }

  @ServerOperation()
  async getMyTodos(@Query() query: IQuery<Todo[]>, @Dto() { userId }: GetMyTodosDto) {
    return this.todoRepo.paginate(query, { where: { ownedBy: userId } });
  }

  @ServerOperation()
  async getUser(@Query() query: IQuery<User>, @Dto() { userId }: GetUserDto) {
    return this.userRepo.findOneOrFail(userId, query);
  }

  @ServerOperation()
  async addTodo(@Query() query: IQuery<Todo>, @Dto() dto: AddTodoDto) {
    console.log(query);
    const me = await this.userRepo.repo.findOneOrFail(dto.userId);
    return this.todoRepo.upsert(
      { ...dto, id: uuid.v4(), dateCreated: new Date(), ownedBy: me, tags: [] },
      query
    );
  }

  @ServerOperation()
  async addTag(@Query() query: IQuery<Todo>, @Dto() dto: AddTagDto) {
    const todo = await this.todoRepo.repo.findOneOrFail(dto.todoId);
    return this.tagRepo.upsert({ ...dto, id: uuid.v4(), todos: [todo] }, query);
  }
}
