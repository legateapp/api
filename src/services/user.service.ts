import { User } from '@prisma/client';
import { Service } from 'typedi';
import UserValidator from '../validators/user.validator';
import DatabaseService from './database.service';

@Service()
export default class UserService {
  constructor(private readonly client: DatabaseService) {
    //
  }

  /**
   * Find a user by the email address.
   */
  public async findByEmail(email: string): Promise<User | null> {
    return this.client.user.findUnique({ where: { email } });
  }

  /**
   * Create a new user and persist to the database.
   */
  public async create(request: UserValidator): Promise<User> {
    return this.client.user.create({
      data: {
        name: request.name,
        password: request.password,
        email: request.email,
      },
    });
  }
}
