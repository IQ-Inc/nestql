import { IOperation } from '@nestql/common';
import { ExampleAppOperations, JobPost, GetJobPostDto, AddJobPostDto, User } from '@nestql/example-domain';
import { INestCommunication, Operation, Payload, Resolver } from '@nestql/nestjs';
import * as uuid from 'uuid';
import { JobPostRepository } from './repositories/job-post.repository';
import { UserRepository } from './repositories/user.repository';

@Resolver()
export class AppController implements INestCommunication<ExampleAppOperations> {
  constructor(private readonly jobPostRepo: JobPostRepository, private readonly userRepo: UserRepository) {}

  @Operation()
  async getJobPost(@Payload() { props, query }: IOperation<JobPost, GetJobPostDto>) {
    return this.jobPostRepo.findOne(props.id, query);
  }

  @Operation()
  async addJobPost(@Payload() { props, query }: IOperation<JobPost, AddJobPostDto>) {
    return this.jobPostRepo.upsert({ ...props, id: uuid.v4() }, query);
  }

  @Operation()
  async getUser(@Payload() { props, query }: IOperation<User, { id: string }>) {
    return this.userRepo.findOneOrFail(props.id, query);
  }

  @Operation()
  async getAllJobs(@Payload() { query }: IOperation<JobPost[]>) {
    return this.jobPostRepo.findAll(query);
  }
}
