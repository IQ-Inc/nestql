import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const now = Date.now();
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const url = request.url;

    return next.handle().pipe(
      tap(() => {
        Logger.log(`\nURL:\t${url}\nTook:\t${Date.now() - now}ms`, context.getClass().name);
      })
    );
  }
}
