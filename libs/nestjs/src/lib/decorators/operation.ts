import { Post } from '@nestjs/common';

export function Operation() {
  return function (target: object, key: string, descriptor: PropertyDescriptor) {
    Post(key)(target, key, descriptor);
  };
}
