import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromTodos from './todos.reducer';
import * as TodosSelectors from './todos.selectors';
import * as TodosActions from './todos.actions';
import { AddTodoDto } from '@nestql/example-domain';

@Injectable()
export class TodosFacade {
  readonly loaded$ = this.store.pipe(select(TodosSelectors.getTodosLoaded));
  readonly allTodos$ = this.store.pipe(select(TodosSelectors.getAllTodos));
  readonly selectedTodos$ = this.store.pipe(select(TodosSelectors.getSelected));

  constructor(private store: Store<fromTodos.TodosPartialState>) {}

  getMyTodos(myId: string) {
    this.store.dispatch(TodosActions.loadTodos({ myId }));
  }

  addTodo(dto: AddTodoDto) {
    this.store.dispatch(TodosActions.addTodo({ dto }));
  }
}
