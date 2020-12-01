import { Body } from '@nestjs/common';
import { ValidationPipe } from '../validation.pipe';

export function Payload() {
  return function (target: object, key: string, index: number) {
    Body(new ValidationPipe())(target, key, index);
  };
}
