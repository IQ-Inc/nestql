import { __NESTQL_OPERATIONS, __NESTQL_OPERATIONS_PLACEHOLDER } from '@nestql/common';

export function Operation() {
  return function (target: any, key: string) {
    const operations = target[__NESTQL_OPERATIONS];
    if (!operations) {
      target[__NESTQL_OPERATIONS] = {};
    }
    target[__NESTQL_OPERATIONS][key] = __NESTQL_OPERATIONS_PLACEHOLDER;
  };
}
