import { Component } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ApiFacadeService } from './api.facade';

@Component({
  selector: 'nestql-example-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.api.getAllJobs([
    {
      id: true,
      jobTitle: true,
    },
  ]);

  constructor(private readonly api: ApiFacadeService) {
    // this.hello$.subscribe((s) => s[0].jobTitle);
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
        )
      )
      .subscribe();
  }
}
