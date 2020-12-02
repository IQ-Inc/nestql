import { Component } from '@angular/core';
import { createQueryModel } from '@nestql/common';
import { JobPost, User } from '@nestql/example-domain';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ApiFacadeService } from './api.facade';

const TJobPost = createQueryModel<JobPost[]>()([
  {
    id: true,
    ownedBy: {
      id: true,
      firstName: true,
    },
    __paginate: 'all',
  },
]);

interface State {
  user: typeof TJobPost;
}

@Component({
  selector: 'nestql-example-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.api.getAllJobs(TJobPost);

  constructor(private readonly api: ApiFacadeService) {
    this.hello$.subscribe((s) => s[0]);
  }

  createJob() {
    // this.api
    //   .getUser({ __all_fields: true }, { id: '1' })
    //   .pipe(
    //     switchMap((user) =>
    //       this.api.addJobPost(
    //         { __all_fields: true },
    //         {
    //           name: `rand_${Math.random()}`,
    //           datePosted: new Date(),
    //           jobTitle: '',
    //           ownedBy: user,
    //         }
    //       )
    //     )
    //   )
    //   .subscribe();
  }
}
