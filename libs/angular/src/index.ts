import { IOperation, IOperations, IClientOperation } from '@nestql/common';

export * from './lib/angular.module';
export * from './lib/decorators';

export type IClientOperations<O extends IOperations> = {
  [K in keyof O]: O[K] extends IOperation<infer T, infer Props> ? IClientOperation<T, Props> : never;
};
