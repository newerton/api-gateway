import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}

  create(payload: CreateProductDto): Observable<AxiosResponse<Product>> {
    return this.client.send('products.create', { payload });
  }

  findAll(): Observable<AxiosResponse<Product[]>> {
    return this.client.send('products.findall', {});
  }
}
