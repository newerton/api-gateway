import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { QueryFilterSchemaProps } from 'src/common/validations/query-filter.schema.validation';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_SERVICE_TCP') private readonly client: ClientProxy,
    @Inject('PRODUCT_SERVICE_KAFKA') private readonly clientKafka: ClientKafka,
  ) {}

  // create(payload: CreateProductDto): Observable<AxiosResponse<Product>> {
  //   return this.client.send('products.create', { payload });
  // }

  create(payload: CreateProductDto): Observable<Product> {
    return this.clientKafka.send('products.create', payload);
  }

  findAll(query: QueryFilterSchemaProps): Observable<AxiosResponse<Product[]>> {
    return this.client.send('products.findall', { query });
  }
}
