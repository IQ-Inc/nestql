import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { JobPostStore, JobPostState } from './job-post.store';

@Injectable({ providedIn: 'root' })
export class JobPostQuery extends QueryEntity<JobPostState> {

  constructor(protected store: JobPostStore) {
    super(store);
  }

}
