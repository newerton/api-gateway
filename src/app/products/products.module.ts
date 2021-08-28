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
        name: 'PRODUCT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'product-engine',
          port: 3003,
        },
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductsModule {}
