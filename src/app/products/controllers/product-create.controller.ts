import { Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { ClientKafka, Payload } from '@nestjs/microservices';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';

import { ErrorSchema } from '@app/@common/application/documentations/openapi/swagger/error.schema';
import { ZodValidationPipe } from '@app/@common/application/pipes';
import {
  Resource,
  Scopes,
} from '@app/@common/infrastructure/adapter/identity-and-access/keycloak';

import {
  ProductCreateInput,
  ProductCreateOutput,
} from '../dto/product-create.dto';
import { ProductCreateUseCase } from '../use-cases/product-create.use-case';
import { ProductCreateSchemaValidation } from '../validations/product-create.schema.validation';

@ApiTags('products')
@Controller('products')
@Resource('Product')
@ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorSchema })
@ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
export class ProductCreateController {
  constructor(
    @Inject('PRODUCT_SERVICE_KAFKA') private readonly clientKafka: ClientKafka,
    private readonly useCase: ProductCreateUseCase,
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
  @ApiOkResponse({
    description: 'Created successfully',
    type: ProductCreateInput,
  })
  execute(
    @Payload(new ZodValidationPipe(new ProductCreateSchemaValidation()))
    payload: ProductCreateInput,
  ): Observable<ProductCreateOutput> {
    return this.useCase.execute(payload);
  }
}
