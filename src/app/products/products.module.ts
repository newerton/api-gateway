import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductsController } from './products.controller';
import { ProductService } from './products.service';

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
            host: 'product-engine',
            port: 3003,
          },
        }),
      },
      {
        name: 'PRODUCT_SERVICE_KAFKA',
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
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
  controllers: [ProductsController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductsModule {}
