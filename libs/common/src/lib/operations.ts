import { PromiseOrObservable } from '@nestql/util';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';
import { NESTQL_DTO, NESTQL_QUERY } from './constants';
import { IParser } from './parser';
import { IQuery } from './query';

export interface IOperation<T, Dto = undefined> {
  [NESTQL_QUERY]: IQuery<T>;
  [NESTQL_DTO]?: Dto;
}
export interface ISubscription<T, Dto = undefined> {
  [NESTQL_QUERY]: IQuery<T>;
  [NESTQL_DTO]?: Dto;
}

export type IOperations = Record<keyof unknown, IOperation<unknown, unknown>>;
export type ISubscriptions = Record<keyof unknown, ISubscription<unknown, unknown>>;

export type IServerOperation<T, Dto = undefined> = (
  query: IQuery<T>,
  dto: Dto
) => PromiseOrObservable<IParser<T, IQuery<T>>>;
export type IServerSubscription<T, Dto = undefined> = (socket: Socket, query: IQuery<T>, dto: Dto) => void;

export type IClientOperation<T, Dto = undefined> = <Q extends IQuery<T>>(
  query: Q,
  dto?: Dto
) => Observable<IParser<T, Q>>;
export interface IClientSubscription<T, Dto = undefined> extends IClientOperation<T, Dto> {}
