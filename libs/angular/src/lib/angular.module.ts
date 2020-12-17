import { CommonModule } from '@angular/common';
import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import {
  IOperation,
  IOperations,
  ISubscription,
  ISubscriptions,
  NESTQL,
  NESTQL_DTO,
  NESTQL_QUERY,
  __NESTQL_OPERATIONS,
  __NESTQL_SUBSCRIPTIONS,
} from '@nestql/common';
import 'reflect-metadata';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as io from 'socket.io-client';

@NgModule({
  imports: [CommonModule],
})
export class NestQLAngularModule {
  static forRoot({
    apiUrl,
    operations,
    subscriptions,
  }: {
    apiUrl: string;
    operations: IOperations[];
    subscriptions: ISubscriptions[];
  }): ModuleWithProviders<NestQLAngularModule> {
    const ops: Provider[] = operations.map((o) => ({
      provide: o,
      useValue: createOperations(apiUrl, o),
    }));

    const subs: Provider[] = subscriptions.map((s) => ({
      provide: s,
      useValue: createSubscriptions(apiUrl, s),
    }));

    return {
      ngModule: NestQLAngularModule,
      providers: [...ops, ...subs],
    };
  }
}

function createOperations(apiUrl: string, operations: IOperations) {
  const http = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
  const ops = (operations as any).prototype[__NESTQL_OPERATIONS];
  for (const funcName of Object.keys(ops)) {
    const clientOperation = (query: object, props: object) => {
      const body: IOperation<object, object> = { [NESTQL_DTO]: props, [NESTQL_QUERY]: query };
      return http
        .post<any>(`${apiUrl}/${NESTQL}/${funcName}`, body)
        .pipe(tap((r) => console.log('NestQL Response: ', r)));
    };
    ops[funcName] = clientOperation;
  }

  return ops;
}

function createSubscriptions(apiUrl: string, subscriptions: ISubscriptions) {
  const subs = (subscriptions as any).prototype[__NESTQL_SUBSCRIPTIONS];
  const subKeys = Object.keys(subs);

  if (subKeys.length > 0) {
    const socket = io(apiUrl);

    for (const funcName of subKeys) {
      const subject = new Subject<any>();

      socket.on(funcName, (d: unknown) => {
        subject.next(d);
      });

      const clientSubscription = (query: object, props: object) => {
        const body: ISubscription<object, object> = {
          [NESTQL_DTO]: props,
          [NESTQL_QUERY]: query,
        };
        socket.emit(funcName, body);
        return subject.asObservable();
      };

      subs[funcName] = clientSubscription;
    }
  }

  return subs;
}
