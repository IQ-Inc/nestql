import { InjectRepository } from '@nestjs/typeorm';
import { IRepository } from '@nestql/nestjs';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

export class UserRepository extends IRepository<UserEntity> {
  constructor(@InjectRepository(UserEntity) protected readonly userRepo: Repository<UserEntity>) {
    super(userRepo);
  }
}
