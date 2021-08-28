import { Controller, Post, HttpCode, Get } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ProductService } from './products.service';
import { Public, Resource, Scopes } from 'src/common/auth/keycloak';
import { ErrorSchema } from 'src/common/schemas/Error.schema';
import { Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@ApiTags('products')
@Controller('products')
@Resource(Product.name)
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Scopes('create')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create product' })
  @ApiOkResponse({ description: 'Created successfully', type: Product })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorSchema })
  @ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
  create(
    @Payload() payload: CreateProductDto,
  ): Observable<AxiosResponse<Product>> {
    return this.productService.create(payload);
  }

  @Get()
  @Scopes('find-all')
  @HttpCode(200)
  @Public()
  @ApiOperation({ summary: 'List all products' })
  @ApiOkResponse({ description: 'Show products', type: Product })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorSchema })
  @ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
  findAll(): Observable<AxiosResponse<Product[]>> {
    return this.productService.findAll();
  }
}
