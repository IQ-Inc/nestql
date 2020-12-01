import { NESTQL_ALL } from './constants';
import { Parser } from './parser';
import { Query } from './query';

export function removeExtraFields<T, Q extends Query<T>>(fullEntity: T | T[], query: Q) {
  if (!fullEntity || !query) return;

  if (Array.isArray(query)) {
    query = query[0];
  }

  const remove = (e: T) => {
    const qKeys = Object.keys(query);
    if (!qKeys.includes(NESTQL_ALL)) {
      for (const k of Object.keys(e)) {
        if (!qKeys.includes(k)) {
          delete e[k as keyof T];
        }
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
  } else {
    fullEntity = remove(fullEntity);
  }

  return fullEntity as Parser<T, Q>;
}

export function createTypeormRelationsArray<T>(query: Query<T>) {
  if (Array.isArray(query)) {
    query = query[0];
  }

  const arr: string[] = [];

  const removeNextToLast = (str: string) => {
    const chars: number[] = [];
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i) === '.') {
        chars.push(i);
      }
    }
    const index = chars[chars.length - 2];
    return str.substring(index + 1);
  };

  const concat = (k: string, n: number) => {
    let str = '';
    if (n > 1) str += `${arr[arr.length - 1]}.`;
    str += k;
    str = removeNextToLast(str);
    arr.push(str);
  };

  let iter = 0;
  const parse = (q: Query<T>) => {
    iter++;
    for (const k in q) {
      if (typeof q[k] === 'object') {
        concat(k, iter);
        parse((q[k] as unknown) as Query<T>);
        iter--;
      }
    }
  };

  parse(query);

  return arr;
}
