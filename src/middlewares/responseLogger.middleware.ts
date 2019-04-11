import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { ResponseUtil, logger } from '@app/utils';

@Middleware({ type: 'after' })
export class ResponseLoggerMiddleware implements ExpressMiddlewareInterface {
  async use(request: any, response: any, next: (err?: any) => Promise<any>): Promise<any> {
    if (!response.headersSent) {
      response.status(404);
      response.send(ResponseUtil.notFound({ message: 'The path does not exit' }, response));
    }
    response.responseTime = (new Date()).getTime() - response.startTime.getTime();
    logger.info(
      { request, response, event: 'response' }, `Request sent for id: ${response.reqId}`,
    );
    response.end();
  }
}
