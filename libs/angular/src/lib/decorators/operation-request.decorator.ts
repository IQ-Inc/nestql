import {
  __NESTQL_OPERATIONS,
  __NESTQL_OPERATIONS_PLACEHOLDER,
  __NESTQL_SUBSCRIPTIONS,
  __NESTQL_SUBSCRIPTIONS_PLACEHOLDER,
} from '@nestql/common';

export function ClientOperation(): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol) {
    const operations = target[__NESTQL_OPERATIONS];
    if (!operations) {
      target[__NESTQL_OPERATIONS] = {};
    }
    target[__NESTQL_OPERATIONS][propertyKey] = __NESTQL_OPERATIONS_PLACEHOLDER;
  };
}

export function ClientSubscription(): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol) {
    const operations = target[__NESTQL_SUBSCRIPTIONS];
    if (!operations) {
      target[__NESTQL_SUBSCRIPTIONS] = {};
    }
    target[__NESTQL_SUBSCRIPTIONS][propertyKey] = __NESTQL_SUBSCRIPTIONS_PLACEHOLDER;
  };
}
