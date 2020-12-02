import { NESTQL_PAGINATE } from './constants';
import { IParser } from './parser';
import { IQuery } from './query';

export const createQueryModel = <T>() => <Q extends IQuery<T>>(q: Q) => q;

export type IStoreModel<T, Q> = IParser<
  T,
  Q extends [infer G] ? Omit<G, typeof NESTQL_PAGINATE> : Omit<Q, typeof NESTQL_PAGINATE>
>;
