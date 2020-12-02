import { Query } from '@nestql/common';
import {
  AddJobPostDto,
  ExampleAppOperations,
  GetJobPostDto,
  GetUserDto,
  JobPost,
  User,
} from '@nestql/example-domain';
import { INestCommunication, NestOperation, NestQuery, NestProps, Resolver } from '@nestql/nestjs';
import * as uuid from 'uuid';
import { JobPostRepository } from './repositories/job-post.repository';
import { UserRepository } from './repositories/user.repository';

@Resolver()
export class AppController implements INestCommunication<ExampleAppOperations> {
  constructor(private readonly jobPostRepo: JobPostRepository, private readonly userRepo: UserRepository) {}

  @NestOperation()
  async getJobPost(@NestQuery() query: Query<JobPost>, @NestProps() props: GetJobPostDto) {
    return this.jobPostRepo.findOne(props.id, query);
  }

  @NestOperation()
  async addJobPost(@NestQuery() query: Query<JobPost>, @NestProps() props: AddJobPostDto) {
    return this.jobPostRepo.upsert({ ...props, id: uuid.v4() }, query);
  }

  @NestOperation()
  async getUser(@NestQuery() query: Query<User>, @NestProps() props: GetUserDto) {
    return this.userRepo.findOneOrFail(props.id, query);
  }

  @NestOperation()
  async getAllJobs(@NestQuery() query: Query<JobPost[]>) {
    return this.jobPostRepo.findAll(query);
  }
}
