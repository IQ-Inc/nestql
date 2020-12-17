import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { IOperations, ISubscriptions } from '@nestql/common';
import { NestQLTypeormRepository } from '@nestql/typeorm';

@Module({})
export class NestQLNestJSModule {
  static forRoot<Repo extends new (...args: any[]) => NestQLTypeormRepository<any, any>>({
    operators,
    subscriptions,
    entities,
    repositories,
    dbConfig,
  }: {
    operators: IOperations[];
    subscriptions: ISubscriptions[];
    entities: EntityClassOrSchema[];
    repositories: Repo[];
    dbConfig: TypeOrmModuleOptions;
  }): DynamicModule {
    return {
      module: NestQLNestJSModule,
      imports: [TypeOrmModule.forRoot(dbConfig), TypeOrmModule.forFeature(entities)],
      providers: [...subscriptions, ...repositories] as any,
      controllers: operators as any,
      exports: subscriptions as any,
    };
  }
}
