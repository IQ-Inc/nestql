import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPrivateEntity } from '../entities/user-private.entity';
import { NestQLTypeormRepository } from '@nestql/typeorm';

export class UserPrivateRepository extends NestQLTypeormRepository<UserPrivateEntity> {
  constructor(
    @InjectRepository(UserPrivateEntity) protected readonly userPrivateRepo: Repository<UserPrivateEntity>
  ) {
    super(userPrivateRepo);
  }
}
