import { Body } from '@nestjs/common';
import { ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { NESTQL_DTO, NESTQL_QUERY } from '@nestql/common';
import { ValidationPipe } from '../pipes/validation.pipe';

export function Query(): ParameterDecorator {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    Body(NESTQL_QUERY)(target, propertyKey, parameterIndex);
  };
}

export function QuerySub(): ParameterDecorator {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    MessageBody(NESTQL_QUERY)(target, propertyKey, parameterIndex);
  };
}

export function Dto(): ParameterDecorator {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    Body(NESTQL_DTO, new ValidationPipe())(target, propertyKey, parameterIndex);
  };
}

export function DtoSub(): ParameterDecorator {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    MessageBody(NESTQL_DTO, new ValidationPipe())(target, propertyKey, parameterIndex);
  };
}

export function Subscriber(): ParameterDecorator {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    ConnectedSocket()(target, propertyKey, parameterIndex);
  };
}
