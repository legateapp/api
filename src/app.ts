import 'reflect-metadata';

import { createExpressServer, useContainer } from 'routing-controllers';
import Express, { Application } from 'express';
import Container from 'typedi';
import path from 'path';

import { NODE_ENV, PORT } from './config';
import { logger } from './utils/logging';

export default class App {
  public application: Application;

  public environment: string;

  public port: number;

  constructor() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useContainer(Container);

    this.application = createExpressServer({
      controllers: [path.join(__dirname, '/controllers/*.controller.ts')],
    });

    this.environment = NODE_ENV || 'development';
    this.port = Number(PORT) || 8000;

    this.initializeMiddleware();
  }

  public getApplication(): Application {
    return this.application;
  }

  public serve(): void {
    this.getApplication().listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.environment} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  protected initializeMiddleware(): App {
    this.application.use(Express.json());

    return this;
  }
}
