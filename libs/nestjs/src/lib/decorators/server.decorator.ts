import { Body, Controller, Post } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { NESTQL, NESTQL_DTO, NESTQL_QUERY } from '@nestql/common';
import { ValidationPipe } from '../pipes';

export function ServerOperations(): ClassDecorator {
  return function (target: Function) {
    Controller(NESTQL)(target);
  };
}

export function ServerOperation(): MethodDecorator {
  return function <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) {
    Body(NESTQL_QUERY)(target, propertyKey, 0);
    Body(NESTQL_DTO)(target, propertyKey, 1);
    Post(propertyKey as string)(target, propertyKey, descriptor);
  };
}

export function ServerSubscriptions(): ClassDecorator {
  return function (target: Function) {
    WebSocketGateway()(target);
  };
}

export function ServerSubscription(): MethodDecorator {
  return function <T>(target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) {
    ConnectedSocket()(target, propertyKey, 0);
    MessageBody(NESTQL_QUERY)(target, propertyKey, 1);
    MessageBody(NESTQL_DTO, new ValidationPipe())(target, propertyKey, 2);
    SubscribeMessage(propertyKey as string)(target, propertyKey, descriptor);
  };
}
