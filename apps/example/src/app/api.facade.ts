import { IClientOperations, ClientOperation } from '@nestql/angular';
import { IClientOperation } from '@nestql/common';
import {
  AddJobPostDto,
  ExampleAppOperations,
  GetJobPostDto,
  GetUserDto,
  JobPost,
  User,
} from '@nestql/example-domain';

export class ApiFacadeService implements IClientOperations<ExampleAppOperations> {
  @ClientOperation()
  getJobPost!: IClientOperation<JobPost, GetJobPostDto>;

  @ClientOperation()
  addJobPost!: IClientOperation<JobPost, AddJobPostDto>;

  @ClientOperation()
  getUser!: IClientOperation<User, GetUserDto>;

  @ClientOperation()
  getAllJobs!: IClientOperation<JobPost[]>;
}
