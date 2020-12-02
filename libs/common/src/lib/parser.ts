import { DecayNever } from '@nestql/util';
import { NESTQL_PAGINATE } from './constants';
import { IDomainModel } from './domain-model';
import { IArrayQuery, IRelationQuery } from './query';

export type IParser<CompleteType, QueriedType> = DecayNever<
  {
    [K in keyof CompleteType]: K extends keyof QueriedType
      ? QueriedType[K] extends IArrayQuery<CompleteType, QueriedType>
        ? IParser<CompleteType[K], Omit<QueriedType[K], typeof NESTQL_PAGINATE>>
        : QueriedType[K] extends IRelationQuery<any, any>
        ? IParser<CompleteType[K], QueriedType[K]>
        : QueriedType[K] extends true
        ? CompleteType[K]
        : never
      : never;
  }
>;
