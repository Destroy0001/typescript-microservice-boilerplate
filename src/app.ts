import {
    PingController,
} from '@app/controllers/';
import {
    ErrorHandlerMiddleware,
    RequestLoggerMiddleWare,
    ResponseLoggerMiddleware,
} from '@app/middlewares';

import { logger } from '@app/utils';
import { appConfig } from '@config';
import 'reflect-metadata';
import {
    useContainer as useRoutingContainer,
    useExpressServer as setApplicationConfig,
} from 'routing-controllers';
import { Container } from 'typedi';
import {
    createConnection as createDatabaseConnection,
    useContainer as useOrmContainer,
} from 'typeorm';
import * as path from 'path';
import * as bodyparser from 'body-parser';
import * as https from 'https';
import * as http from 'http';
import * as fs from 'fs';
import * as App from 'express';

const controllers = [
  PingController,
];

const middlewares = [
  RequestLoggerMiddleWare,
  ErrorHandlerMiddleware,
  ResponseLoggerMiddleware,
];

export class Application {
  private static instance: Application = new Application();
  constructor() {
    if (Application.instance) {
      return Application.instance;
    }
    Application.instance = this;
  }

  async start() {
        // Setup routing-controllers to use typedi container.
    useRoutingContainer(Container);

        // setting up typeorm to use typedi container
    useOrmContainer(Container);
        // establishing a connection with the database,
        // this always has to be below useOrmContainer
    try {
      console.log('Establishing database connection');
      await createDatabaseConnection();
    } catch (e) {
      console.error('Could not connect to database');
      console.log(e);
      throw e;
    }

        /**
         * We create a new server instance.
         * We could have also used createExpressServer here to attach controllers
         * to an existing instance.
         */
    const cors = {
      origin: '*',
      allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
      exposeHeaders: ['X-Request-Id'],
    };

    const app = App();
    app.use(bodyparser.json());
    setApplicationConfig(app, {
      cors,
      controllers,
      middlewares,
      routePrefix: '/api',
      defaultErrorHandler: false,
    });
    let server;
    if (appConfig.is_secure) {
      try {
        console.log('STARTING WITH HTTPS');
        const key = fs.readFileSync(
                    path.join(__dirname, '../', appConfig.credentials.key),
                    'utf8',
                );
        const cert = fs.readFileSync(
                    path.join(__dirname, '../', appConfig.credentials.cert),
                    'utf8',
                );
        const passphrase = appConfig.credentials.passphrase;
        const credentials = { key, cert, passphrase };
        server = https.createServer(credentials, app);
        server.listen(appConfig.httpsPort, appConfig.host, serverStartListener);

      } catch (e) {
        console.error('could not start server securely, please check ssl config');
        console.log(e);
      }

    } else {
      try {
        console.log('STARTING WITH HTTP');
        server = http.createServer(app);
        server.listen(appConfig.httpPort, appConfig.host, serverStartListener);
      } catch (e) {
        console.error('could not start server');
        console.log(e);
      }

    }

    return { app, server };
  }

}

const serverStartListener = async () => {
  logger.info(
        { event: 'execute' },
        // tslint:disable-next-line:max-line-length
        `API server ${appConfig.is_secure ? 'with https' : ''} listening on ${appConfig.host}:${appConfig.is_secure ? appConfig.httpsPort : appConfig.httpPort}, in ${appConfig.env}`,
    );

  console.log(
        // tslint:disable-next-line:max-line-length
        `API server ${appConfig.is_secure ? 'with https' : ''} listening on ${appConfig.host}:${appConfig.is_secure ? appConfig.httpsPort : appConfig.httpPort}, in ${appConfig.env}`,
    );
};

export const application = new Application();
application.start();
