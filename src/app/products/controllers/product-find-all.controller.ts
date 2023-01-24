import {
  Controller,
  Get,
  HttpCode,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

import { ErrorSchema } from '@app/@common/application/documentations/openapi/swagger/error.schema';
import { HeadersPaginationInterceptor } from '@app/@common/application/interceptors/headers-pagination.interceptors';
import { JoiValidationPipe } from '@app/@common/application/pipes/joi-validation.pipe';
import {
  QueryFilterSchema,
  QueryFilterSchemaProps,
} from '@app/@common/application/validators/query-params/query-filter.schema.validation';
import {
  Public,
  Resource,
  Scopes,
} from '@app/@common/infrastructure/adapter/identity-and-access/keycloak';

import { ProductFindAllOutput } from '../dto/product-find-all.dto';
import { ProductFindAllUseCase } from '../use-cases/product-find-all.use-case';

@ApiTags('products')
@Controller('products')
@Resource('Product')
@ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorSchema })
@ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
export class ProductFindAllController {
  constructor(private readonly useCase: ProductFindAllUseCase) {}

  @Get()
  @Scopes('find-all')
  @HttpCode(200)
  @Public()
  @ApiOperation({ summary: 'List all products' })
  @ApiOkResponse({ description: 'Show products', type: ProductFindAllOutput })
  @UseInterceptors(HeadersPaginationInterceptor)
  execute(
    @Query(new JoiValidationPipe(new QueryFilterSchema()))
    query: QueryFilterSchemaProps,
  ): Observable<AxiosResponse<ProductFindAllOutput[]>> {
    return this.useCase.execute(query);
  }
}
