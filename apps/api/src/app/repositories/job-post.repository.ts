import { InjectRepository } from '@nestjs/typeorm';
import { NestQLTypeormRepository } from '@nestql/typeorm';
import { Repository } from 'typeorm';
import { JobPostEntity } from '../entities/job-post.entity';

export class JobPostRepository extends NestQLTypeormRepository<JobPostEntity> {
  constructor(@InjectRepository(JobPostEntity) protected readonly jobPostRepo: Repository<JobPostEntity>) {
    super(jobPostRepo);
  }
}
