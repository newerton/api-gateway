import { HttpModule } from '@nestjs/axios';
import { Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ApiServerConfig } from '@core/@shared/infrastructure/config/env';

import {
  ProductCreateController,
  ProductFindAllController,
} from './controllers';
import { ProductCreateUseCase, ProductFindAllUseCase } from './use-cases';

const useCases: Provider[] = [ProductCreateUseCase, ProductFindAllUseCase];
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
              brokers: config.get<string[]>('kafka.brokers'),
              // logLevel: 5,
            },
            consumer: {
              groupId: 'product-consumer-api-gateway',
              allowAutoTopicCreation: true,
            },
          },
        }),
      },
    ]),
  ],
  controllers: [ProductCreateController, ProductFindAllController],
  providers: [...useCases],
})
export class ProductsModule {}
