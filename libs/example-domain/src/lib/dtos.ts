import { IsNotEmpty, IsNotEmptyObject, IsString } from 'class-validator';
import { JobPost, User } from './models';

export abstract class GetJobPostDto {
  @IsNotEmpty()
  @IsString()
  id!: string;
}

export abstract class AddJobPostDto implements Omit<JobPost, 'id'> {
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  jobTitle!: string;

  @IsString()
  datePosted!: Date;

  @IsNotEmptyObject()
  ownedBy!: User;
}

export abstract class GetUserDto {
  @IsNotEmpty()
  @IsString()
  id!: string;
}
