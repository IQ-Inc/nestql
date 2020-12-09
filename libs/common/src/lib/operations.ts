import { PromiseOrObservable } from '@nestql/util';
import { Observable } from 'rxjs';
import { NESTQL_PROPS, NESTQL_QUERY } from './constants';
import { IParser } from './parser';
import { IQuery } from './query';

export interface IOperation<T, Props = undefined> {
  [NESTQL_QUERY]: IQuery<T>;
  [NESTQL_PROPS]: Props;
}

export type IOperations = Record<keyof unknown, IOperation<unknown, unknown>>;

export type IServerOperation<T, Props = undefined> = (
  query: IQuery<T>,
  props: Props
) => PromiseOrObservable<IParser<T, IQuery<T>>>;

export type IClientOperation<T, Props = undefined> = <Q extends IQuery<T>>(
  query: Q,
  props: Props
) => Observable<IParser<T, Q>>;
