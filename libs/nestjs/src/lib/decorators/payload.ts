import { Body } from '@nestjs/common';

export function Payload() {
  return function (target: object, key: string, index: number) {
    Body()(target, key, index);
  };
}
