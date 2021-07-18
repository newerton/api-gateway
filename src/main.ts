import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.enableShutdownHooks();

  // // app.use(cookieParser());
  // // app.use(bodyParser.json({ limit: '20mb' }));
  // // app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
  // // app.use(helmet());
  // // app.use(compression());

  // if (process.env.NODE_ENV !== 'production') {
  //   app.enableCors({
  //     origin: true,
  //     credentials: true,
  //   });
  // }

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

  await app.listen(8000, () => logger.log('api-gateway is running'));
}
bootstrap();
