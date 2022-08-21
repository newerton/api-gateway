import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import csurf from 'csurf';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks(); // Disable in test

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

  if (process.env.NODE_ENV === 'production') {
    app.use(csurf({ cookie: true }));
  }

  const config = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('The API Gateway description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'API Gateway Docs',
  };
  SwaggerModule.setup('docs', app, document, customOptions);

  await app.listen(8000, () =>
    logger.log('api-gateway is running on port 8000'),
  );
}
bootstrap();
