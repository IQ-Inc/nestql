import { IOneToMany, IManyToOne, IOneToOne, IManyToMany } from './relations';

export type IQuery<Q> = Q extends Array<infer A> ? IRootQuery<A> & IPaginate : IRootQuery<Q>;
type IRootQuery<Q> = Q extends Array<infer A> ? IIQuery<A> : IIQuery<Q>;

type Rel<Self, Relation> =
  | IOneToOne<Self, Relation>
  | IOneToMany<Self, Relation>
  | IManyToOne<Self, Relation>
  | IManyToMany<Self, Relation>;

type IIQuery<Q> = {
  [K in keyof Q]?: Q[K] extends Rel<Q[K], infer _> ? true : IRootQuery<Q[K]>;
};

export interface IPaginate {
  __paginate?: {
    __page: number;
    __limit: number;
  };
}
