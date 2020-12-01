import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPostEntity } from './entities/job-post.entity';
import { UserEntity } from './entities/user.entity';
import { UserPrivateEntity } from './entities/user-private.entity';

const typeormModule = TypeOrmModule.forFeature([UserEntity, UserPrivateEntity, JobPostEntity]);

@Global()
@Module({
  imports: [typeormModule],
  exports: [typeormModule],
})
export class DbModule {}
