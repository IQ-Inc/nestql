import { InjectRepository } from '@nestjs/typeorm';
import { IRepository } from '@nestql/nestjs';
import { Repository } from 'typeorm';
import { JobPostEntity } from '../entities/job-post.entity';

export class JobPostRepository extends IRepository<JobPostEntity> {
  constructor(@InjectRepository(JobPostEntity) protected readonly jobPostRepo: Repository<JobPostEntity>) {
    super(jobPostRepo);
  }
}
