import { WebSocketGateway } from '@nestjs/websockets';

export function Gateway(): ClassDecorator {
  return function (target: Function) {
    WebSocketGateway()(target);
  };
}
