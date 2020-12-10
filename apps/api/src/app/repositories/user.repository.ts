import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@nestql/example-domain';
import { NestQLTypeormRepository } from '@nestql/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

export class UserRepository extends NestQLTypeormRepository<User> {
  constructor(@InjectRepository(UserEntity) public readonly repo: Repository<User>) {
    super(repo);
  }
}
