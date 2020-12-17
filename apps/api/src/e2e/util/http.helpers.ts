import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { IOperation, IParser, NESTQL_DTO, NESTQL_QUERY } from '@nestql/common';
import { IncomingHttpHeaders } from 'http2';
import { Response as HttpResponse } from 'light-my-request';

/*
    _  _ _   _
   | || | |_| |_ _ __
   | __ |  _|  _| '_ \
   |_||_|\__|\__| .__/
                |_|
*/

export type ImResponse<T> = Omit<HttpResponse, 'body'> & { body: T };

export function createImResponse<T>(res: HttpResponse) {
  return {
    ...res,
    body: res.body ? JSON.parse(res.body) : '',
  } as ImResponse<T>;
}

export async function operate<O extends IOperation<any, any>>(
  app: NestFastifyApplication,
  name: string,
  o: O
) {
  const body: IOperation<object, object> = { [NESTQL_DTO]: o.__dto, [NESTQL_QUERY]: o.__query };
  const res = await app.inject({
    method: 'POST',
    url: `/nestql/${name}`,
    payload: body,
  });

  return createImResponse<Response>(res);
}
