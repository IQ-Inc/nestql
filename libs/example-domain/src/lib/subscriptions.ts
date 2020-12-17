import { ISubscription } from '@nestql/common';
import { GetMyTodosDto, Todo } from './models';

export interface ExampleTodoAppSubscriptions {
  subMyTodos: ISubscription<Todo[], GetMyTodosDto>;
}
