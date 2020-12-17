import { Injectable, NgZone } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ApiOperations, ApiSubscriptions } from '../api.facade';
import * as TodosActions from './todos.actions';
import { TodosQueryModel } from './todos.models';

/*
  TODO: socket.io does not run inside NgZone!
*/

export function enterZone(zone: NgZone) {
  return <T>(source: Observable<T>) =>
    new Observable<T>((observer: any) =>
      source.subscribe({
        next: (x: any) => zone.run(() => observer.next(x)),
        error: (err: any) => observer.error(err),
        complete: () => observer.complete(),
      })
    );
}

@Injectable()
export class TodosEffects {
  readonly loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.loadTodos),
      switchMap(({ myId }) => this.apiS.subMyTodos(TodosQueryModel, { userId: myId })),
      enterZone(this.zone),
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
    private readonly apiS: ApiSubscriptions,
    private readonly zone: NgZone
  ) {}
}
