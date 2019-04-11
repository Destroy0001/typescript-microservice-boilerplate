import * as moment from 'moment';
import { appConfig } from '@config';

export class ValidatorUtil {
  static isDelayedRequest(timestamp:number) {
    const requestTime = moment.unix(Math.floor(timestamp / 1000));
    if (!requestTime.isValid()) {
      return true;
    }

    const currentTime = moment();
    const requestDelay:number = Math.abs(
      moment.duration(currentTime.diff(requestTime)).asMinutes(),
    );
    if (requestDelay > appConfig.MAX_REQUEST_DELAY) {
      return true;
    }

    return false;
  }
}
