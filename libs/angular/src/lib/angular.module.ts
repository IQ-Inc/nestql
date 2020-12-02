import { CommonModule } from '@angular/common';
import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { IOperation, IOperations, NESTQL_PROPS, NESTQL_QUERY, __NESTQL_OPERATIONS } from '@nestql/common';
import 'reflect-metadata';

@NgModule({
  imports: [CommonModule],
})
export class NestQLAngularModule {
  static forRoot({
    apiUrl,
    operations,
  }: {
    apiUrl: string;
    operations: IOperations;
  }): ModuleWithProviders<NestQLAngularModule> {
    return {
      ngModule: NestQLAngularModule,
      providers: [
        {
          provide: operations,
          useValue: createOperations(apiUrl, operations),
        },
      ],
    };
  }
}

function createOperations(apiUrl: string, operations: IOperations) {
  const http = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
  const o = (operations as any).prototype[__NESTQL_OPERATIONS];
  for (const k of Object.keys(o)) {
    const IClientOperation = (query: object, props: object) => {
      const body: IOperation<object, object> = { [NESTQL_PROPS]: props, [NESTQL_QUERY]: query };
      return http.post<any>(`${apiUrl}/nestql/${k}`, body);
    };
    o[k] = IClientOperation;
  }
  return o;
}
