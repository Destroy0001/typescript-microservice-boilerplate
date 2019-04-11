import { ResponseType } from '@app/types';
import { httpStatusCodes, httpStatusMessages, httpResponseStatus } from '@constants';

export class ResponseUtil {
  static success({ statusCode, data = null, message = null }: ResponseType, response:any) {
    const status = httpResponseStatus.SUCCESS;
    response.status(statusCode);
    response.body = { status, data, message, request_id: response.reqId };
    return response.body;
  }

  static fail({ statusCode, code, data = null, message = null }: ResponseType, response:any) {
    const status = httpResponseStatus.FAILED;
    response.status(statusCode);
    response.body = { status, code, message, request_id: response.reqId };
    return response.body;
  }

  static error({ statusCode, code, data = null, message = null }: ResponseType, response:any) {
    const status = httpResponseStatus.ERROR;
    response.status(statusCode);
    response.body = { status, code, message, request_id: response.reqId };
    return response.body;
  }

  static ok(params = {}, response:any) {
    return ResponseUtil.success({
      ...params,
      statusCode: httpStatusCodes.OK,
    },                          response);
  }

  static created(params = {}, response:any) {
    return ResponseUtil.success({
      ...params,
      statusCode: httpStatusCodes.CREATED,
    },                          response);
  }

  static accepted(params = {}, response:any) {
    return ResponseUtil.success({
      ...params,
      statusCode: httpStatusCodes.ACCEPTED,
    },                          response);
  }

  static noContent (params = {}, response:any) {
    return ResponseUtil.success({
      ...params,
      statusCode: httpStatusCodes.NO_CONTENT,
    },                          response);
  }

  static badRequest (params = {}, response:any) {
    return ResponseUtil.fail({
      ...params,
      code: httpStatusMessages.BAD_REQUEST,
      statusCode: httpStatusCodes.BAD_REQUEST,
    },                       response);
  }

  static forbidden (params = {}, response:any) {
    return ResponseUtil.fail({
      ...params,
      code: httpStatusMessages.FORBIDDEN,
      statusCode: httpStatusCodes.FORBIDDEN,
    },                       response);
  }

  static notFound (params = {}, response:any) {
    return ResponseUtil.fail({
      ...params,
      code: httpStatusMessages.NOT_FOUND,
      statusCode: httpStatusCodes.NOT_FOUND,
    },                       response);
  }

  static requestTimeout (params = {}, response:any) {
    return ResponseUtil.fail({
      ...params,
      code: httpStatusMessages.REQUEST_TIMEOUT,
      statusCode: httpStatusCodes.REQUEST_TIMEOUT,
    },                       response);
  }

  static unprocessableEntity (params = {}, response:any) {
    return ResponseUtil.fail({
      ...params,
      code: httpStatusMessages.UNPROCESSABLE_ENTITY,
      statusCode: httpStatusCodes.UNPROCESSABLE_ENTITY,
    },                       response);
  }

  static internalServerError (params = {}, response:any) {
    return ResponseUtil.error({
      ...params,
      code: httpStatusMessages.INTERNAL_SERVER_ERROR,
      statusCode: httpStatusCodes.INTERNAL_SERVER_ERROR,
    },                        response);
  }

  static notImplemented (params = {}, response:any) {
    return ResponseUtil.error({
      ...params,
      code: httpStatusMessages.NOT_IMPLEMENTED,
      statusCode: httpStatusCodes.NOT_IMPLEMENTED,
    },                        response);
  }

  static badGateway (params = {}, response:any) {
    return ResponseUtil.error({
      ...params,
      code: httpStatusMessages.BAD_GATEWAY,
      statusCode: httpStatusCodes.BAD_GATEWAY,
    },                        response);
  }

  static unauthorized (params = {}, response:any) {
    return ResponseUtil.fail({
      ...params,
      code: httpStatusMessages.UNAUTHORIZED,
      statusCode: httpStatusCodes.UNAUTHORIZED,
    },                       response);
  }
}
