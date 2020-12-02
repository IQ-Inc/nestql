import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { IJobPostQueryModel } from './job-post.model';

export interface JobPostState extends EntityState<IJobPostQueryModel, string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'job-post' })
export class JobPostStore extends EntityStore<JobPostState> {
  constructor() {
    super();
  }
}
