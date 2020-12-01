import { NESTQL_ALL, NESTQL_PAGINATE } from './constants';
import { IDomainModel } from './domain-model';

export type Query<T> = T extends Array<infer TA>
  ? [Query<TA>]
  : T extends IDomainModel<infer Props, infer Relations>
  ? ({ __all?: true } & {
      [K in keyof Props]?: true;
    }) &
      {
        [K in keyof Relations]?: Relations[K] extends Array<infer RA>
          ? ArrayQuery<T, RA>
          : RelationQuery<T, Relations[K]>;
      }
  : never;

export type ArrayQuery<T, A> = [
  RelationQuery<T, A> & {
    __paginate?: {
      page: number;
      limit: number;
    };
  }
];

export type RelationQuery<T, R> = R extends IDomainModel<infer Props, infer Relations>
  ? Query<IDomainModel<Props, Pick<Relations, ProhibitAdjacentReferencedRelations<T, Relations>>>>
  : never;

type ProhibitAdjacentReferencedRelations<T, Relations> = {
  [K in keyof Relations]: Relations[K] extends Array<infer A>
    ? A extends T
      ? never
      : K
    : Relations[K] extends T
    ? never
    : K;
}[keyof Relations];

// First, define a type that, when passed a union of keys, creates an object which
// cannot have those properties. I couldn't find a way to use this type directly,
// but it can be used with the below type.
type Impossible<K extends keyof any> = {
  [P in K]: never;
};

// The secret sauce! Provide it the type that contains only the properties you want,
// and then a type that extends that type, based on what the caller provided
// using generics.
type NoExtraProperties<T, U extends T = T> = U & Impossible<Exclude<keyof U, keyof T>>;
