import { __NESTQL_OPERATIONS, __NESTQL_OPERATIONS_PLACEHOLDER } from '@nestql/common';

export function OperationRequest(): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol) {
    const operations = target[__NESTQL_OPERATIONS];
    if (!operations) {
      target[__NESTQL_OPERATIONS] = {};
    }
    target[__NESTQL_OPERATIONS][propertyKey] = __NESTQL_OPERATIONS_PLACEHOLDER;
  };
}
