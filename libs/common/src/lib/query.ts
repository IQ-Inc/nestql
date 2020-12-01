import { NESTQL_ALL, NESTQL_PAGINATE } from './constants';
import { IDomainModel } from './domain-model';

export type Query<T> = T extends Array<infer TA>
  ? [Query<TA>]
  : T extends IDomainModel<infer Props, infer Relations>
  ? (
      | { [NESTQL_ALL]: true | undefined }
      | {
          [K in keyof Props]?: true;
        }
    ) &
      {
        [K in keyof Relations]?: Relations[K] extends Array<infer RA>
          ? ArrayQuery<T, RA>
          : RelationQuery<T, Relations[K]>;
      }
  : never;

export type ArrayQuery<T, A> = [
  RelationQuery<T, A> & {
    [NESTQL_PAGINATE]?: {
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
