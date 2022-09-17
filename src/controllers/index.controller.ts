import { Get, JsonController, Res } from 'routing-controllers';
import { Response } from 'express';
import { Service } from 'typedi';

@JsonController()
@Service()
export default class IndexController {
  @Get('/')
  public index(@Res() res: Response): Response {
    return res.status(200).send({
      ping: 'pong',
    });
  }
}
