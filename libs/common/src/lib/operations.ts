import { PromiseOrObservable } from '@nestql/util';
import { Observable } from 'rxjs';
import { Parser } from './parser';
import { Query } from './query';

export interface IOperation<T, Props = undefined> {
  query: Query<T>;
  props: Props;
}

export type IOperations = Record<keyof unknown, IOperation<unknown, unknown>>;

export type ServerOperation<T, Props = undefined> = (
  query: Query<T>,
  props: Props
) => PromiseOrObservable<Parser<T, Query<T>>>;

export type ClientOperation<T, Props = undefined> = (
  query: Query<T>,
  props?: Props
) => Observable<Parser<T, Query<T>>>;
