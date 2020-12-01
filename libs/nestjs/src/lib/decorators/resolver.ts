import { Controller } from '@nestjs/common';

export function Resolver() {
  return function (target: Function) {
    Controller('nestql')(target);
  };
}
