import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import {
  ProductCreateInput,
  ProductCreateOutput,
} from '../dto/product-create.dto';

@Injectable()
export class ProductCreateUseCase {
  constructor(
    @Inject('PRODUCT_SERVICE_KAFKA') private readonly clientKafka: ClientKafka,
  ) {}

  // create(payload: ProductCreateInput): Observable<AxiosResponse<ProductCreateOutput>> {
  //   return this.client.send('products.create', { payload });
  // }

  execute(payload: ProductCreateInput): Observable<ProductCreateOutput> {
    return this.clientKafka.send('products.create', payload);
  }
}
