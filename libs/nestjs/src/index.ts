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

export type INestCommunication<T extends IOperations> = {
  [K in keyof T]: T[K] extends IOperation<infer T, infer Props> ? ServerOperation<T, Props> : never;
};

export * from './lib/decorators';
export * from './lib/repository';
