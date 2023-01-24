import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

import { QueryFilterSchemaProps } from '@app/@common/application/validators/query-params/query-filter.schema.validation';

import { ProductFindAllOutput } from '../dto/product-find-all.dto';

@Injectable()
export class ProductFindAllUseCase {
  constructor(
    @Inject('PRODUCT_SERVICE_TCP') private readonly client: ClientProxy,
  ) {}

  execute(
    query: QueryFilterSchemaProps,
  ): Observable<AxiosResponse<ProductFindAllOutput[]>> {
    return this.client.send('products.findall', { query });
  }
}
