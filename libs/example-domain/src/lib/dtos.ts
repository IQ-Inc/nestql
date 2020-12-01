import { JobPost, User } from './models';

export abstract class GetJobPostDto {
  id!: string;
}

export abstract class AddJobPostDto implements Omit<JobPost, 'id'> {
  name!: string;
  jobTitle!: string;
  datePosted!: Date;
  ownedBy!: User;
}
