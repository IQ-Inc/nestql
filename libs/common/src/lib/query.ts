import { RecursivePartial } from '@nestql/util';
import { NESTQL_ALL, NESTQL_LIMIT, NESTQL_PAGE, NESTQL_PAGINATE } from './constants';
import { IDomainModel } from './domain-model';

export type IQuery<Q> = Q extends Array<infer TA>
  ? IArrayQuery<Q, TA>
  : Q extends IDomainModel<infer Props, infer Relations>
  ? IPropQuery<Props> & IDiscernArrayFromObjectRelationQuery<Q, Relations>
  : never;

type IPropQuery<Props> =
  | {
      [K in keyof Props]: true;
    }
  | { __all: true };

type IDiscernArrayFromObjectRelationQuery<Q, Relations> = {
  [K in keyof Relations]: Relations[K] extends Array<infer RA>
    ? IArrayQuery<Q, RA>
    : IRelationQuery<Q, Relations[K]>;
};

export type IArrayQuery<Q, A> = [
  IRelationQuery<Q, A> & {
    [NESTQL_PAGINATE]: {
      [NESTQL_PAGE]: number;
      [NESTQL_LIMIT]: number;
    };
  }
];

export type IRelationQuery<Q, R> = R extends IDomainModel<infer Props, infer Relations>
  ? IQuery<IDomainModel<Props, Pick<Relations, IProhibitAdjacentReferencedRelations<Q, Relations>>>>
  : never;

type IProhibitAdjacentReferencedRelations<Q, Relations> = {
  [K in keyof Relations]: Relations[K] extends Array<infer A>
    ? A extends Q
      ? never
      : K
    : Relations[K] extends Q
    ? never
    : K;
}[keyof Relations];
