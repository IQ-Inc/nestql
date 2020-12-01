import { User } from '@nestql/example';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { JobPostEntity } from './job-post.entity';
import { UserPrivateEntity } from './user-private.entity';

@Entity({ name: 'User' })
export class UserEntity implements Required<User> {
  @PrimaryColumn('text')
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  dateCreated!: Date;

  @OneToOne(() => UserPrivateEntity, { nullable: true })
  @JoinColumn()
  privateData!: UserPrivateEntity;

  @OneToMany(() => JobPostEntity, (e) => e.ownedBy)
  ownedJobs!: JobPostEntity[];
}
