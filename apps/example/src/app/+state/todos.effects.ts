import { Injectable, NgZone } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map, switchMap } from 'rxjs/operators';
import { ApiOperations, ApiSubscriptions } from '../api.facade';
import * as TodosActions from './todos.actions';
import { TodosQueryModel } from './todos.models';

@Injectable()
export class TodosEffects {
  readonly loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.loadTodos),
      switchMap(({ myId }) => this.apiS.subMyTodos(TodosQueryModel, { userId: myId })),
      map((todos) => {
        console.log('Todo', todos);
        return TodosActions.loadTodosSuccess({ todos: todos.items });
      })
    )
  );

  readonly addTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.addTodo),
      fetch({
        run: ({ dto }) =>
          this.apiO.addTodo(TodosQueryModel, dto).pipe(map((todo) => TodosActions.addTodoSuccess({ todo }))),
        onError: (action, error) => {
          console.error('Error adding a Todo: ', error);
          return TodosActions.addTodoFailure({ error });
        },
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly apiO: ApiOperations,
    private readonly apiS: ApiSubscriptions
  ) {}
}
