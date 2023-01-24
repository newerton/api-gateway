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
import { Resource, Scopes } from 'nest-keycloak-connect';
import { Observable } from 'rxjs';

import { ErrorSchema } from '@app/@common/application/documentations/openapi/swagger/error.schema';

import { UserChangePasswordInput } from '../dto/user-change-password.dto';
import { User } from '../entities/user.entity';
import { UserChangePasswordUseCase } from '../use-cases/user-change-password.use-case';

@ApiTags('users')
@Controller('users')
@Resource(User.name)
@ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorSchema })
@ApiNotFoundResponse({ description: 'Not found', type: ErrorSchema })
@ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
export class UserChangePasswordController {
  constructor(private readonly useCase: UserChangePasswordUseCase) {}

  @Put('change-password')
  @Scopes('change-password')
  @HttpCode(204)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change password' })
  @ApiNoContentResponse({ description: 'Updated successfully', type: User })
  execute(
    @Payload() payload: UserChangePasswordInput,
    @Headers() headers: HeadersInit,
  ): Observable<AxiosResponse<User>> {
    return this.useCase.execute(payload, headers);
  }
}
