import { IQuery } from '@nestql/common';
import { AddTagDto, AddTodoDto, ExampleAppOperations, GetUserDto, Todo, User } from '@nestql/example-domain';
import { IServerOperations, Props, Query, Resolver, ServerOperation } from '@nestql/nestjs';
import * as uuid from 'uuid';
import { TagRepository } from './repositories/tag.repository';
import { TodoRepository } from './repositories/todo.repository';
import { UserRepository } from './repositories/user.repository';

@Resolver()
export class AppController implements IServerOperations<ExampleAppOperations> {
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
  async getUser(@Query() query: IQuery<User>, @Props() props: GetUserDto) {
    return this.userRepo.findOneOrFail(props.userId, query);
  }

  @ServerOperation()
  async addTodo(@Query() query: IQuery<Todo>, @Props() props: AddTodoDto) {
    const me = await this.userRepo.repo.findOneOrFail(props.userId);
    return this.todoRepo.upsert(
      { ...props, id: uuid.v4(), dateCreated: new Date(), ownedBy: me, tags: [] },
      query
    );
  }

  @ServerOperation()
  async addTag(@Query() query: IQuery<Todo>, @Props() props: AddTagDto) {
    const todo = await this.todoRepo.repo.findOneOrFail(props.todoId);
    return this.tagRepo.upsert({ ...props, id: uuid.v4(), todos: [todo] }, query) as any;
  }
}
