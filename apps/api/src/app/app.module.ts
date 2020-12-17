import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { NestQLNestJSModule } from '@nestql/nestjs';
import { TagEntity } from './entities/tag.entity';
import { TodoEntity } from './entities/todo.entity';
import { UserPrivateEntity } from './entities/user-private.entity';
import { UserEntity } from './entities/user.entity';
import { HttpErrorFilter } from './error.filter';
import { ExampleAppGateway } from './gateways/app.gateway';
import { LogInterceptor } from './log.interceptor';
import { ExampleAppOperator } from './operators/app.operator';
import { TagRepository } from './repositories/tag.repository';
import { TodoRepository } from './repositories/todo.repository';
import { UserPrivateRepository } from './repositories/user-private.repository';
import { UserRepository } from './repositories/user.repository';

export const APP_CONF = (isE2e: boolean) => ({
  imports: [
    NestQLNestJSModule.forRoot({
      operators: [ExampleAppOperator],
      gateways: [ExampleAppGateway],
      entities: [UserEntity, UserPrivateEntity, TodoEntity, TagEntity],
      repositories: [UserRepository, UserPrivateRepository, TodoRepository, TagRepository],
      dbConfig: {
        type: 'postgres',
        host: '127.0.0.1',
        port: 5432,
        username: 'postgres',
        password: '1Qazxsw2',
        database: isE2e ? 'nestql-e2e' : 'nestql',
        synchronize: true,
        autoLoadEntities: true,
        ssl: false,
      },
    }),
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LogInterceptor },
    { provide: APP_FILTER, useClass: HttpErrorFilter },
  ],
});

@Module(APP_CONF(false))
export class AppModule {}
