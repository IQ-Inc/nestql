import { IQuery } from '@nestql/common';
import {
  AddJobPostDto,
  ExampleAppOperations,
  GetJobPostDto,
  GetUserDto,
  JobPost,
  User,
} from '@nestql/example-domain';
import { IServerOperations, ServerOperation, Query, Props, Resolver } from '@nestql/nestjs';
import * as uuid from 'uuid';
import { JobPostRepository } from './repositories/job-post.repository';
import { UserRepository } from './repositories/user.repository';

@Resolver()
export class AppController implements IServerOperations<ExampleAppOperations> {
  constructor(private readonly jobPostRepo: JobPostRepository, private readonly userRepo: UserRepository) {}

  @ServerOperation()
  async getJobPost(@Query() query: IQuery<JobPost>, @Props() props: GetJobPostDto) {
    return this.jobPostRepo.findOne(props.id, query);
  }

  @ServerOperation()
  async addJobPost(@Query() query: IQuery<JobPost>, @Props() props: AddJobPostDto) {
    return this.jobPostRepo.upsert({ ...props, id: uuid.v4() }, query);
  }

  @ServerOperation()
  async getUser(@Query() query: IQuery<User>, @Props() props: GetUserDto) {
    return this.userRepo.findOneOrFail(props.id, query);
  }

  @ServerOperation()
  async getAllJobs(@Query() query: IQuery<JobPost[]>) {
    return this.jobPostRepo.findAll(query) as any;
  }
}
