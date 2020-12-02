import { Body } from '@nestjs/common';
import { ValidationPipe } from '../validation.pipe';

export function NestQuery() {
  return function (target: object, key: string, index: number) {
    Body('query')(target, key, index);
  };
}

export function NestProps() {
  return function (target: object, key: string, index: number) {
    Body('props', new ValidationPipe())(target, key, index);
  };
}
