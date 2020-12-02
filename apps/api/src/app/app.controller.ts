import { Query } from '@nestql/common';
import {
  AddJobPostDto,
  ExampleAppOperations,
  GetJobPostDto,
  GetUserDto,
  JobPost,
  User,
} from '@nestql/example-domain';
import { INestCommunication, Operation, QueryPayload, PropsPayload, Resolver } from '@nestql/nestjs';
import * as uuid from 'uuid';
import { JobPostRepository } from './repositories/job-post.repository';
import { UserRepository } from './repositories/user.repository';

@Resolver()
export class AppController implements INestCommunication<ExampleAppOperations> {
  constructor(private readonly jobPostRepo: JobPostRepository, private readonly userRepo: UserRepository) {}

  @Operation()
  async getJobPost(@QueryPayload() query: Query<JobPost>, @PropsPayload() props: GetJobPostDto) {
    return this.jobPostRepo.findOne(props.id, query);
  }

  @Operation()
  async addJobPost(@QueryPayload() query: Query<JobPost>, @PropsPayload() props: AddJobPostDto) {
    return this.jobPostRepo.upsert({ ...props, id: uuid.v4() }, query);
  }

  @Operation()
  async getUser(@QueryPayload() query: Query<User>, @PropsPayload() props: GetUserDto) {
    return this.userRepo.findOneOrFail(props.id, query);
  }

  @Operation()
  async getAllJobs(@QueryPayload() query: Query<JobPost[]>) {
    return this.jobPostRepo.findAll(query);
  }
}
