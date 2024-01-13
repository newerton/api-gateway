import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ApiServerConfig } from '@core/@shared/infrastructure/config/env';

import {
  ProductCreateController,
  ProductFindAllController,
} from './controllers';
import { ProductCreateUseCase, ProductFindAllUseCase } from './use-cases';

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
})
export class ProductsModule {}
