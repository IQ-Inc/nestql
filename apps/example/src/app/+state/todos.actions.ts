import { AddTodoDto } from '@nestql/example-domain';
import { createAction, props } from '@ngrx/store';
import { TodosEntity } from './todos.models';

export const loadTodos = createAction('[Todos] Load Todos', props<{ myId: string }>());

export const loadTodosSuccess = createAction('[Todos] Load Todos Success', props<{ todos: TodosEntity[] }>());

export const loadTodosFailure = createAction('[Todos] Load Todos Failure', props<{ error: any }>());

/*
  Add Todo
*/

export const addTodo = createAction('[Todos] Add Todo', props<{ dto: AddTodoDto }>());

export const addTodoSuccess = createAction('[Todos] Add Todo Success', props<{ todo: TodosEntity }>());

export const addTodoFailure = createAction('[Todos] Add Todo Failure', props<{ error: any }>());
