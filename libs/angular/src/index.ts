import { IOperation, IOperations, ClientOperation } from '@nestql/common';

export * from './lib/angular.module';
export * from './lib/decorators';

export type IAngularCommunication<O extends IOperations> = {
  [K in keyof O]: O[K] extends IOperation<infer T, infer Props> ? ClientOperation<T, Props> : never;
};
