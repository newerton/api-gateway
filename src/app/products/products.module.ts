import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductsController } from './products.controller';
import { ProductService } from './products.service';

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE_TCP',
        transport: Transport.TCP,
        options: {
          host: 'product-engine',
          port: 3003,
        },
      },
      {
        name: 'PRODUCT_SERVICE_KAFKA',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'product',
            brokers: ['host.docker.internal:9094'],
          },
          consumer: {
            groupId: 'product-consumer',
            allowAutoTopicCreation: true,
          },
        },
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductsModule {}
