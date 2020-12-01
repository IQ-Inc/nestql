import { JobPost, User } from '@nestql/example';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'JobPost' })
export class JobPostEntity implements Required<JobPost> {
  @PrimaryColumn('text')
  id!: string;

  @Column()
  jobTitle!: string;

  @Column()
  datePosted!: Date;

  @ManyToOne(() => UserEntity, (e) => e.ownedJobs)
  ownedBy!: User;
}
