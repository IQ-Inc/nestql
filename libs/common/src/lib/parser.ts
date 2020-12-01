import { DecayNever } from '@nestql/util';
import { NESTQL_ALL, NESTQL_PAGINATE } from './constants';
import { ArrayQuery, RelationQuery } from './query';

export type Parser<CompleteType, QueriedType> = DecayNever<
  {
    [K in keyof CompleteType]: K extends keyof QueriedType
      ? QueriedType[K] extends ArrayQuery<CompleteType, QueriedType>
        ? Parser<CompleteType[K], Omit<QueriedType[K], typeof NESTQL_PAGINATE | typeof NESTQL_ALL>>
        : QueriedType[K] extends RelationQuery<any, any>
        ? Parser<CompleteType[K], QueriedType[K]>
        : QueriedType[K] extends true
        ? CompleteType[K]
        : never
      : QueriedType extends { [NESTQL_ALL]: true }
      ? CompleteType[K]
      : never;
  }
>;
