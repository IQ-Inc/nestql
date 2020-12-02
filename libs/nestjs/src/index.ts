import { DynamicModule, Module } from '@nestjs/common';
import { IOperation, IOperations, IServerOperation } from '@nestql/common';

@Module({})
export class NestQLNestModule {
  static forRoot(): DynamicModule {
    return {
      module: NestQLNestModule,
    };
  }
}

export type IServerOperations<O extends IOperations> = {
  [K in keyof O]: O[K] extends IOperation<infer T, infer Props> ? IServerOperation<T, Props> : never;
};

export * from './lib/decorators';
export * from './lib/pipes';
