import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ApiServerConfig } from '@core/@shared/infrastructure/config/env/api-server.config';

import { ProductCreateController } from './controllers/product-create.controller';
import { ProductFindAllController } from './controllers/product-find-all.controller';
import { ProductCreateUseCase } from './use-cases/product-create.use-case';
import { ProductFindAllUseCase } from './use-cases/product-find-all.use-case';

@Module({
  imports: [
    HttpModule,
    ClientsModule.registerAsync([
      {
        name: 'PRODUCT_SERVICE_TCP',
        inject: [ConfigService],
        useFactory: () => ({
          name: 'PRODUCT_SERVICE_TCP',
          transport: Transport.TCP,
          options: {
            host: '0.0.0.0',
            port: ApiServerConfig.PRODUCT_ENGINE_PORT,
          },
        }),
      },
      {
        name: 'PRODUCT_SERVICE_KAFKA',
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => ({
          name: 'PRODUCT_SERVICE_KAFKA',
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'product',
              brokers: [config.get<string>('kafka.brokers')],
            },
            consumer: {
              groupId: 'product-consumer',
              allowAutoTopicCreation: true,
            },
          },
        }),
      },
    ]),
  ],
  controllers: [ProductCreateController, ProductFindAllController],
  providers: [ProductCreateUseCase, ProductFindAllUseCase],
  exports: [ProductCreateUseCase, ProductFindAllUseCase],
})
export class ProductsModule {}
