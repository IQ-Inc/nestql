import { Component } from '@angular/core';
import { ApiFacadeService } from './api.facade';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'nestql-example-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.api.getAllJobs([
    {
      id: true,
      datePosted: true,
    },
  ]);

  constructor(private readonly api: ApiFacadeService) {
    // this.hello$.subscribe((s) => s.ownedBy);
  }

  createJob() {
    this.api
      .getUser({ __all: true }, { id: '1' })
      .pipe(
        switchMap((user) =>
          this.api.addJobPost(
            { id: true },
            {
              name: `rand_${Math.random()}`,
              datePosted: new Date(),
              jobTitle: '',
              ownedBy: user,
            }
          )
        ),
        tap(
          () =>
            (this.hello$ = this.api.getAllJobs([
              {
                id: true,
                datePosted: true,
              },
            ]))
        )
      )
      .subscribe();
  }
}
