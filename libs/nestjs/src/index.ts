import { DynamicModule, Module } from '@nestjs/common';
import {
  IOperation,
  IOperations,
  IServerOperation,
  IServerSubscription,
  ISubscription,
} from '@nestql/common';

export type IServerOperations<O extends IOperations> = {
  [K in keyof O]: O[K] extends IOperation<infer T, infer Props> ? IServerOperation<T, Props> : never;
};

export type IServerSubscriptions<O extends IOperations> = {
  [K in keyof O]: O[K] extends ISubscription<infer T, infer Props> ? IServerSubscription<T, Props> : never;
};

export * from './lib/decorators';
export * from './lib/nestjs.module';
export * from './lib/pipes';
export * from './lib/testing';
