import { IOneToMany, IManyToOne, IOneToOne, IManyToMany } from './relations';

export type IQuery<Q> = Q extends Array<infer A> ? IIQuery<A> & IPaginate : IIQuery<Q>;

type IIQuery<T> = {
  [K in keyof T]?: T[K] extends IOneToMany<any, any>
    ? IQuery<T[K]>
    : T[K] extends IManyToOne<any, any>
    ? IQuery<T[K]>
    : T[K] extends IOneToOne<any, any>
    ? IQuery<T[K]>
    : T[K] extends IManyToMany<any, any>
    ? IQuery<T[K]>
    : true;
};

export interface IPaginate {
  __paginate?: {
    __page: number;
    __limit: number;
  };
}
