import { Component } from '@angular/core';
import { ApiFacadeService } from './api.facade';

@Component({
  selector: 'nestql-example-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.api.getUser(
    {
      name: true,
      todos: {
        title: true,
        content: true,
        dateCreated: true,
        tags: {
          text: true,
        },
      },
    },
    { userId: '1' }
  );

  constructor(private readonly api: ApiFacadeService) {}

  // createJob() {
  //   this.hello$.subscribe((s) => s.todos);
  // }
}
