import { DecayNever } from '@nestql/util';
import { NESTQL_ALL, NESTQL_PAGINATE } from './constants';
import { IArrayQuery, IRelationQuery } from './query';

export type IParser<CompleteType, QueriedType> = DecayNever<
  {
    [K in keyof CompleteType]: K extends keyof QueriedType
      ? QueriedType[K] extends IArrayQuery<CompleteType, QueriedType>
        ? IParser<CompleteType[K], Omit<QueriedType[K], typeof NESTQL_PAGINATE | typeof NESTQL_ALL>>
        : QueriedType[K] extends IRelationQuery<any, any>
        ? IParser<CompleteType[K], QueriedType[K]>
        : QueriedType[K] extends true
        ? CompleteType[K]
        : never
      : QueriedType extends { __all: true }
      ? CompleteType[K]
      : never;
  }
>;
