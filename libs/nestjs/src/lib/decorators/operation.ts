import { Post } from '@nestjs/common';

export function NestOperation() {
  return function (target: object, key: string, descriptor: PropertyDescriptor) {
    Post(key)(target, key, descriptor);
  };
}
