import { PromiseOrObservable } from '@nestql/util';
import { Observable } from 'rxjs';
import { Parser } from './parser';
import { Query } from './query';

export interface IOperation<T, Props = undefined> {
  query: Query<T>;
  props: Props;
}

export type IOperations = Record<keyof unknown, IOperation<unknown, unknown>>;

export type ServerOperation<T, Props = undefined> = <Q extends Query<T>>(
  request: IOperation<T, Props>
) => PromiseOrObservable<Parser<T, Q>>;

export type ClientOperation<T, Props = undefined> = <Q extends Query<T>>(
  query: Q,
  props?: Props
) => Observable<Parser<T, Q>>;
