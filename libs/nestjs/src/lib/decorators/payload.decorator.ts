import { Body } from '@nestjs/common';
import { NESTQL_PROPS, NESTQL_QUERY } from '@nestql/common';
import { ValidationPipe } from '../pipes/validation.pipe';

export function Query(): ParameterDecorator {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    Body(NESTQL_QUERY)(target, propertyKey, parameterIndex);
  };
}

export function Props(): ParameterDecorator {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    Body(NESTQL_PROPS, new ValidationPipe())(target, propertyKey, parameterIndex);
  };
}
