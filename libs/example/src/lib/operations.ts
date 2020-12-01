import { IOperation } from '@nestql/common';
import { AddJobPostDto, GetJobPostDto } from './dtos';
import { JobPost, User } from './models';

export interface ExampleAppOperations {
  getJobPost: IOperation<JobPost, GetJobPostDto>;
  addJobPost: IOperation<JobPost, AddJobPostDto>;
  getUser: IOperation<User, { id: string }>;
  getAllJobs: IOperation<JobPost[]>;
}
