import { Response } from 'express';
import { Body, JsonController, Post, Res } from 'routing-controllers';
import { Service } from 'typedi';

import UserService from '../services/user.service';
import UserValidator from '../validators/user.validator';

@JsonController()
@Service()
export default class UserController {
  constructor(private readonly userService: UserService) {
    //
  }

  @Post('/users')
  public async register(
    @Body() request: UserValidator,
    @Res() response: Response,
  ): Promise<Response> {
    const user = await this.userService.findByEmail(request.email);

    if (user !== null) {
      return response.status(409).send({ message: 'User already exists.' });
    }

    return response.status(201).send(await this.userService.create(request));
  }
}
