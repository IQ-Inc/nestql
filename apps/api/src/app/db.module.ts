import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserPrivateEntity } from './entities/user-private.entity';
import { TodoEntity } from './entities/todo.entity';
import { TagEntity } from './entities/tag.entity';

const typeormModule = TypeOrmModule.forFeature([UserEntity, UserPrivateEntity, TodoEntity, TagEntity]);

@Global()
@Module({
  imports: [typeormModule],
  exports: [typeormModule],
})
export class DbModule {}
