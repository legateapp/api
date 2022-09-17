import { IsEmail, Matches, MinLength } from 'class-validator';

export default class UserValidator {
  @MinLength(1)
  public name!: string;

  @IsEmail()
  public email!: string;

  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/, {
    message: 'Password does not meet the required standards.',
  })
  public password!: string;
}
