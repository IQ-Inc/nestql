import { OnGatewayDisconnect } from '@nestjs/websockets';
import { IQuery } from '@nestql/common';
import { ExampleTodoAppSubscriptions, GetMyTodosDto, Todo } from '@nestql/example-domain';
import {
  DtoSub,
  Gateway,
  IServerSubscriptions,
  QuerySub,
  ServerSubscription,
  Subscriber,
} from '@nestql/nestjs';
import { Socket } from 'socket.io';
import { TodoRepository } from '../repositories/todo.repository';

@Gateway()
export class ExampleAppGateway
  implements IServerSubscriptions<ExampleTodoAppSubscriptions>, OnGatewayDisconnect {
  constructor(private readonly todoRepo: TodoRepository) {}

  handleDisconnect(client: Socket) {
    this.todoRepo.removeListener(client);
  }

  @ServerSubscription()
  async subMyTodos(
    @Subscriber() subscriber: Socket,
    @QuerySub() query: IQuery<Todo[]>,
    @DtoSub() { userId }: GetMyTodosDto
  ) {
    console.log(query, userId);
    this.todoRepo.provisionPaginationSubscription(subscriber, 'subMyTodos', query, {
      where: { ownedBy: { id: userId } },
    });
  }
}
