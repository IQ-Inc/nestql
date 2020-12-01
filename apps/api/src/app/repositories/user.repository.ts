import { InjectRepository } from '@nestjs/typeorm';
import { NestQLTypeormRepository } from '@nestql/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

export class UserRepository extends NestQLTypeormRepository<UserEntity> {
  constructor(@InjectRepository(UserEntity) protected readonly userRepo: Repository<UserEntity>) {
    super(userRepo);
  }
}
