import * as bunyan from 'bunyan';
import { loggerConfig } from '@app/config/logger.config';
import { SerializerUtil } from './serializers.util';

const loggerOptions = {
  ...loggerConfig,
  serializers: bunyan.stdSerializers,
};

export const logger = bunyan.createLogger(loggerOptions);
logger.addSerializers({
  request: SerializerUtil.requestSerializer,
  response: SerializerUtil.responseSerializer,
  err: bunyan.stdSerializers.err,
});
