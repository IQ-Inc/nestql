import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestQLNestModule } from '@nestql/nestjs';
import { AppController } from './app.controller';
import { DbModule } from './db.module';
import { UserPrivateEntity } from './entities/user-private.entity';
import { HttpErrorFilter } from './error.filter';
import { LogInterceptor } from './log.interceptor';
import { JobPostRepository } from './repositories/job-post.repository';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [
    NestQLNestModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: '1Qazxsw2',
      database: 'nestql',
      synchronize: true,
      autoLoadEntities: true,
      ssl: false,
    }),
    DbModule,
  ],
  controllers: [AppController],
  providers: [
    UserRepository,
    UserPrivateEntity,
    JobPostRepository,
    { provide: APP_INTERCEPTOR, useClass: LogInterceptor },
    { provide: APP_FILTER, useClass: HttpErrorFilter },
  ],
})
export class AppModule {}
