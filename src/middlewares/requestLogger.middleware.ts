import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { logger } from '@app/utils';
import { v4 as uuid } from 'uuid';

@Middleware({ type: 'before' })
export class RequestLoggerMiddleWare implements ExpressMiddlewareInterface {
  async use(request: any, response: any, next: (err?: any) => Promise<any>): Promise<any> {
    response.reqId = uuid();
    response.startTime = new Date();
    logger.info(
      { request, event: 'request' },
      `Request start for id: ${response.reqId}`,
    );
    await next();
  }
}
