import { IParser } from './parser';
import { IQuery } from './query';

export const createStoreModelFromQuery = <T>() => <Q extends IQuery<T>>(q: Q) => q;

export type IStoreModel<T, Q> = IParser<T, Q>;
