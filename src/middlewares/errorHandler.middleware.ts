import { UNKNOWN_ENDPOINT, UNKNOWN_ERROR } from '@constants';
import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { ResponseUtil, SerializerUtil, logger } from '@app/utils';

@Middleware({ type: 'after', priority: 1 })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  async error(
    error:any,
    request: any,
    response:any,
    next: (err?: any) => any,
  ) {
    await next();
    logger.error(
      {
        error: error.stack,
        request:SerializerUtil.requestSerializer(request),
        event: 'error',
      },
      `Request failed for id: ${response.reqId}`,
    );
    console.log(response);
    if (!response.body && (!response.statusCode || response.statusCode === 404)) {
      return response.send(ResponseUtil.notFound(UNKNOWN_ENDPOINT, response));
    }
    return response.send(ResponseUtil.internalServerError(UNKNOWN_ERROR, response));
  }
}
