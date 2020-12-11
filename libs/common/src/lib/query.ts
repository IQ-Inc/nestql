import { NESTQL_LIMIT, NESTQL_PAGE, NESTQL_PAGINATE } from './constants';
import { IAnyRelation } from './relations';

export type IQuery<Q> = Q extends Array<infer A> ? IRootQuery<A> & IPaginate : IRootQuery<Q>;
type IRootQuery<Q> = Q extends Array<infer A> ? IIQuery<A> : IIQuery<Q>;

type IIQuery<Q> = {
  [K in keyof Q]?: Q[K] extends IAnyRelation<Q[K], infer _> ? true : IRootQuery<Q[K]>;
};

export interface IPaginate {
  [NESTQL_PAGINATE]?: {
    [NESTQL_PAGE]: number;
    [NESTQL_LIMIT]: number;
  };
}
