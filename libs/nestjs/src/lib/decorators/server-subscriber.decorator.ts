import { SubscribeMessage } from '@nestjs/websockets';

export function ServerSubscription(): MethodDecorator {
  return function <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) {
    SubscribeMessage(propertyKey as string)(target, propertyKey, descriptor);
  };
}
