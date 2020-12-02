import { IAngularCommunication, OperationRequest } from '@nestql/angular';
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
  @OperationRequest()
  getJobPost!: ClientOperation<JobPost, GetJobPostDto>;

  @OperationRequest()
  addJobPost!: ClientOperation<JobPost, AddJobPostDto>;

  @OperationRequest()
  getUser!: ClientOperation<User, GetUserDto>;

  @OperationRequest()
  getAllJobs!: ClientOperation<JobPost[]>;
}
