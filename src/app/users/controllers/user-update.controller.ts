import { Controller, Headers, HttpCode, Put } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

import { ErrorSchema } from '@app/@common/application/documentations/openapi/swagger/error.schema';
import {
  Resource,
  Scopes,
} from '@app/@common/infrastructure/adapter/identity-and-access/keycloak';

import { UserUpdateInput } from '../dto/user-update.dto';
import { User } from '../entities/user.entity';
import { UserUpdateUseCase } from '../use-cases/user-update.use-case';

@ApiTags('users')
@Controller('users')
@Resource(User.name)
@ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorSchema })
@ApiNotFoundResponse({ description: 'Not found', type: ErrorSchema })
@ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
export class UserUpdateController {
  constructor(private readonly useCase: UserUpdateUseCase) {}

  @Put()
  @Scopes('update')
  @HttpCode(204)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user info' })
  @ApiNoContentResponse({ description: 'Updated successfully', type: User })
  update(
    @Payload() payload: UserUpdateInput,
    @Headers() headers: HeadersInit,
  ): Observable<AxiosResponse<User>> {
    return this.useCase.execute(payload, headers);
  }
}
