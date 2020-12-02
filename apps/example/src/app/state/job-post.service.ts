import { Injectable } from '@angular/core';
import { JobPost } from '@nestql/example-domain';
import { tap } from 'rxjs/operators';
import { ApiFacadeService } from '../api.facade';
import { IJobPostQueryModel, JobPostQueryModel } from './job-post.model';
import { JobPostStore } from './job-post.store';

@Injectable({ providedIn: 'root' })
export class JobPostService {
  constructor(private readonly jobPostStore: JobPostStore, private readonly api: ApiFacadeService) {}

  getAllJobPosts() {
    return this.api.getAllJobs(JobPostQueryModel).pipe(tap((j) => this.jobPostStore.upsertMany(j)));
  }

  add(jobPost: IJobPostQueryModel) {
    this.jobPostStore.add(jobPost);
  }

  update(id: string, jobPost: Partial<IJobPostQueryModel>) {
    this.jobPostStore.update(id, jobPost);
  }

  remove(id: string) {
    this.jobPostStore.remove(id);
  }
}
