import { OnGatewayDisconnect } from '@nestjs/websockets';
import { IQuery } from '@nestql/common';
import { ExampleTodoAppSubscriptions, GetMyTodosDto, Todo } from '@nestql/example-domain';
import { IServerSubscriptions, ServerSubscription, ServerSubscriptions } from '@nestql/nestjs';
import { Socket } from 'socket.io';
import { TodoRepository } from './repositories/todo.repository';

@ServerSubscriptions()
export class ExampleAppSubscriptions
  implements IServerSubscriptions<ExampleTodoAppSubscriptions>, OnGatewayDisconnect {
  constructor(private readonly todoRepo: TodoRepository) {}

  handleDisconnect(client: Socket) {
    this.todoRepo.removeListener(client);
  }

  @ServerSubscription()
  async subMyTodos(subscriber: Socket, query: IQuery<Todo[]>, { userId }: GetMyTodosDto) {
    console.log(query, userId);
    this.todoRepo.provisionPaginationSubscription(subscriber, 'subMyTodos', query, {
      where: { ownedBy: { id: userId } },
    });
  }
}
