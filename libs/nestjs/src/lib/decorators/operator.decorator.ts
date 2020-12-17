import { Controller } from '@nestjs/common';

export function Operator(): ClassDecorator {
  return function (target: Function) {
    Controller('nestql')(target);
  };
}
