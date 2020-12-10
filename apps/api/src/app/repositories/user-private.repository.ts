import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPrivateEntity } from '../entities/user-private.entity';
import { NestQLTypeormRepository } from '@nestql/typeorm';
import { UserPrivate } from '@nestql/example-domain';

export class UserPrivateRepository extends NestQLTypeormRepository<UserPrivate> {
  constructor(@InjectRepository(UserPrivateEntity) protected readonly repo: Repository<UserPrivate>) {
    super(repo);
  }
}
