import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from '@nestql/example-domain';
import { NestQLTypeormRepository } from '@nestql/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from '../entities/todo.entity';

export class TodoRepository extends NestQLTypeormRepository<Todo> {
  constructor(@InjectRepository(TodoEntity) public readonly repo: Repository<Todo>) {
    super(repo);
  }
}
