import { Post } from '@nestjs/common';

export function Operation(): MethodDecorator {
  return function <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) {
    Post(propertyKey as string)(target, propertyKey, descriptor);
  };
}
