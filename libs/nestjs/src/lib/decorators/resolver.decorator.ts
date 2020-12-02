import { Controller } from '@nestjs/common';

export function Resolver(): ClassDecorator {
  return function (target: Function) {
    Controller('nestql')(target);
  };
}
