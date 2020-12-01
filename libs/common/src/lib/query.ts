import { NESTQL_ALL, NESTQL_PAGINATE } from './constants';
import { IDomainModel } from './domain-model';

export type Query<Q> = Q extends Array<infer TA>
  ? [Query<TA>]
  : Q extends IDomainModel<infer Props, infer Relations>
  ? ({ __all?: true } & {
      [K in keyof Props]?: true;
    }) &
      {
        [K in keyof Relations]?: Relations[K] extends Array<infer RA>
          ? ArrayQuery<Q, RA>
          : RelationQuery<Q, Relations[K]>;
      }
  : never;

export type ArrayQuery<Q, A> = [
  RelationQuery<Q, A> & {
    __paginate?: {
      page: number;
      limit: number;
    };
  }
];

export type RelationQuery<Q, R> = R extends IDomainModel<infer Props, infer Relations>
  ? Query<IDomainModel<Props, Pick<Relations, ProhibitAdjacentReferencedRelations<Q, Relations>>>>
  : never;

type ProhibitAdjacentReferencedRelations<Q, Relations> = {
  [K in keyof Relations]: Relations[K] extends Array<infer A>
    ? A extends Q
      ? never
      : K
    : Relations[K] extends Q
    ? never
    : K;
}[keyof Relations];
