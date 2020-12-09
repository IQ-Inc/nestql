import { IPagination } from './pagination';

export type IParser<CompleteType, QueriedType> = CompleteType extends Array<infer A>
  ? IPagination<IParser<A, QueriedType>>
  : {
      [K in keyof QueriedType]: K extends keyof CompleteType
        ? CompleteType[K] extends Array<infer AA>
          ? IPagination<IParser<AA, QueriedType[K]>>
          : CompleteType[K]
        : never;
    };
