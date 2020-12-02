import { Body } from '@nestjs/common';
import { ValidationPipe } from '../pipes/validation.pipe';

export function QueryPayload(): ParameterDecorator {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    Body('query')(target, propertyKey, parameterIndex);
  };
}

export function PropsPayload(): ParameterDecorator {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    Body('props', new ValidationPipe())(target, propertyKey, parameterIndex);
  };
}
