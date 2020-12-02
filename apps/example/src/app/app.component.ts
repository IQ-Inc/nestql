import { Component } from '@angular/core';
import { createQueryModel } from '@nestql/common';
import { JobPost } from '@nestql/example-domain';
import { JobPostQuery } from './state/job-post.query';
import { JobPostService } from './state/job-post.service';

@Component({
  selector: 'nestql-example-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.jobPostQuery.selectAll();

  constructor(private readonly jobPostService: JobPostService, private readonly jobPostQuery: JobPostQuery) {}

  getJobPosts() {
    this.jobPostService.getAllJobPosts().subscribe();
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
