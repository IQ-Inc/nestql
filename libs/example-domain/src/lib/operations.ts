import { IOperation } from '@nestql/common';
import { AddJobPostDto, GetJobPostDto, GetUserDto } from './dtos';
import { JobPost, User } from './models';

export interface ExampleAppOperations {
  getJobPost: IOperation<JobPost, GetJobPostDto>;
  addJobPost: IOperation<JobPost, AddJobPostDto>;
  getUser: IOperation<User, GetUserDto>;
  getAllJobs: IOperation<JobPost[]>;
}
