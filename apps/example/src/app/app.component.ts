import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { TodosFacade } from './+state/todos.facade';

interface AddTodoForm {
  title: string;
  content: string;
  owner: string;
  me: string;
}

@Component({
  selector: 'nestql-example-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly todos$ = this.todos.allTodos$;

  readonly addTodoForm = new FormGroup<AddTodoForm>({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    owner: new FormControl('', Validators.required),
    me: new FormControl('', Validators.required),
  });

  constructor(private readonly todos: TodosFacade) {}

  loadMyTodos() {
    this.todos.getMyTodos(this.addTodoForm.value.me);
  }

  addTodo() {
    this.todos.addTodo({
      ...this.addTodoForm.value,
      userId: this.addTodoForm.value.owner,
    });
  }
}
