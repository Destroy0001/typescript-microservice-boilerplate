import { JsonController, Get, Res } from 'routing-controllers';
import { Service } from 'typedi';
import { ResponseUtil } from '@app/utils';

@JsonController('/v1')
@Service()
export class PingController {
  @Get('/ping')
  async ping(@Res() res: any) {
    return ResponseUtil.ok({ message: 'Ping Successful' }, res);
  }
}
