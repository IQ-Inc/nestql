import { DynamicModule, Module } from '@nestjs/common';
import { IOperation, IOperations, ServerOperation } from '@nestql/common';

@Module({})
export class NestQLNestModule {
  static forRoot(): DynamicModule {
    return {
      module: NestQLNestModule,
    };
  }
}

export type INestCommunication<O extends IOperations> = {
  [K in keyof O]: O[K] extends IOperation<infer T, infer Props> ? ServerOperation<T, Props> : never;
};

export * from './lib/decorators';
