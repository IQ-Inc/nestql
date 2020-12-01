import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPrivateEntity } from '../entities/user-private.entity';

export class UserPrivateRepository {
  constructor(
    @InjectRepository(UserPrivateEntity) protected readonly userPrivateRepo: Repository<UserPrivateEntity>
  ) {}
}
