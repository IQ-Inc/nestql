import { IAngularCommunication, Operation } from '@nestql/angular';
import { ClientOperation } from '@nestql/common';
import {
  AddJobPostDto,
  ExampleAppOperations,
  GetJobPostDto,
  GetUserDto,
  JobPost,
  User,
} from '@nestql/example-domain';

export class ApiFacadeService implements IAngularCommunication<ExampleAppOperations> {
  @Operation()
  getJobPost!: ClientOperation<JobPost, GetJobPostDto>;

  @Operation()
  addJobPost!: ClientOperation<JobPost, AddJobPostDto>;

  @Operation()
  getUser!: ClientOperation<User, GetUserDto>;

  @Operation()
  getAllJobs!: ClientOperation<JobPost[]>;
}
