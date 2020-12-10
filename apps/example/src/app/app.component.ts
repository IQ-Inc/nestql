import { Component } from '@angular/core';
import { ApiFacadeService } from './api.facade';

@Component({
  selector: 'nestql-example-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly hello$ = this.api.getAllUsers(
    {
      id: true,
      name: true,
      todos: {
        id: true,
        content: true,
        title: true,
        tags: {
          id: true,
          text: true,
        },
      },
      __paginate: {
        __limit: 1,
        __page: 2,
      },
    },
    undefined
  );

  constructor(private readonly api: ApiFacadeService) {}

  createJob() {
    this.hello$.subscribe((s) => s.items[0].todos[0].tags[0]);
  }
}
