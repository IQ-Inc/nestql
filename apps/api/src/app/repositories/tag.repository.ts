import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '@nestql/example-domain';
import { NestQLTypeormRepository } from '@nestql/typeorm';
import { Repository } from 'typeorm';
import { TagEntity } from '../entities/tag.entity';

export class TagRepository extends NestQLTypeormRepository<Tag> {
  constructor(@InjectRepository(TagEntity) protected readonly tagRepo: Repository<Tag>) {
    super(tagRepo);
  }
}
