import { Controller, Post, HttpCode, Get, Inject } from '@nestjs/common';
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
import { ClientKafka, Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { JoiValidationPipe } from 'src/common/pipes/JoiValidation.pipe';
import { ProductCreateSchema } from 'src/common/validations/product-create.schema.validation';

@ApiTags('products')
@Controller('products')
@Resource(Product.name)
export class ProductsController {
  constructor(
    private readonly productService: ProductService,
    @Inject('PRODUCT_SERVICE_KAFKA') private readonly clientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    const topics = ['products.create'];

    topics.forEach(async (topic) => {
      this.clientKafka.subscribeToResponseOf(topic);
      await this.clientKafka.connect();
    });
  }

  @Post()
  @Scopes('create')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create product' })
  @ApiOkResponse({ description: 'Created successfully', type: Product })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorSchema })
  @ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
  create(
    @Payload(new JoiValidationPipe(new ProductCreateSchema()))
    payload: CreateProductDto,
  ): Observable<Product> {
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
