import { PrismaClient } from '@prisma/client';
import { Service } from 'typedi';

@Service()
export default class DatabaseService extends PrismaClient {
  constructor() {
    super();
  }
}
