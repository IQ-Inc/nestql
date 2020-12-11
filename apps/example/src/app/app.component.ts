import { Component } from '@angular/core';
import { ApiFacadeService } from './api.facade';

@Component({
  selector: 'nestql-example-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly hello$ = this.api.getAllUsers({
    id: true,
    todos: {
      id: true,
      title: true,
    },
    __paginate: {
      __limit: 1,
      __page: 1,
    },
  });

  constructor(private readonly api: ApiFacadeService) {}

  // test() {
  //   this.hello$.subscribe((s) => s.items[0].);
  // }
}
