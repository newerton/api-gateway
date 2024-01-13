import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import helmet from 'helmet';
// import {
//   type ConfigurationInput,
//   type Lightship,
//   createLightship,
// } from 'lightship';

import { applySwagger } from '@app/@common/application/config';
import { ApiServerConfig } from '@core/@shared/infrastructure/config/env';

import { MainModule } from './main.module';

const logger = new Logger('Main');

async function bootstrap() {
  // const configuration: ConfigurationInput = {
  //   detectKubernetes: ApiServerConfig.ENV !== 'production' ? false : true,
  //   gracefulShutdownTimeout: 30 * 1000,
  //   port: ApiServerConfig.LIGHTSHIP_PORT,
  // };

  // const lightship: Lightship = await createLightship(configuration);

  const app = await NestFactory.create(MainModule);

  // lightship.registerShutdownHandler(() => app.close());

  // app.useGlobalPipes(new ValidationPipe());

  if (ApiServerConfig.ENV !== 'test') {
    app.enableShutdownHooks(); // Disable in test
  }

  app.enableCors({
    origin: true,
    credentials: true,
    exposedHeaders: [
      'etag',
      'X-Pagination-Current-Page',
      'X-Pagination-Page-Count',
      'X-Pagination-Per-Page',
      'X-Pagination-Total-Count',
    ],
  });

  app.use(cookieParser());
  app.use(bodyParser.json({ limit: '25mb' }));
  app.use(bodyParser.urlencoded({ limit: '25mb', extended: true }));
  app.use(helmet());

  if (ApiServerConfig.ENV === 'production') {
    app.use(csurf({ cookie: true }));
  }

  applySwagger(app);

  await app.listen(ApiServerConfig.PORT).then(() => {
    // lightship.signalReady();
    logger.log(
      `api-gateway is running in http://localhost:${ApiServerConfig.PORT}`,
    );
  });
}
bootstrap();
