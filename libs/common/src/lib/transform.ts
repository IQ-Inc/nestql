import { IParser } from './parser';
import { IQuery } from './query';

export function removeExtraFields<T, Q extends IQuery<T>>(fullEntity: T | T[], query: Q) {
  if (!fullEntity || !query) return {} as IParser<T, Q>;

  if (Array.isArray(query)) {
    query = query[0];
  }

  const remove = (e: T) => {
    const qKeys = Object.keys(query);
    for (const k of Object.keys(e)) {
      if (!qKeys.includes(k)) {
        delete e[k as keyof T];
      }
    }

    for (const [k, q] of Object.entries(query)) {
      if (typeof q === 'object') {
        removeExtraFields(e[k as keyof T], q);
      }
    }

    return e;
  };

  if (Array.isArray(fullEntity)) {
    fullEntity.map((e) => remove(e));
    fullEntity = fullEntity.filter((e) => Object.entries(e).length > 0);
  } else {
    fullEntity = remove(fullEntity);
  }

  return (fullEntity as unknown) as IParser<T, Q>;
}
