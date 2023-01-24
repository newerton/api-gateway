import { Controller, Get, Headers } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
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

import { User } from '../entities/user.entity';
import { UserMeUseCcase } from '../use-cases/user-me.use-case';

@ApiTags('users')
@Controller('users')
@Resource(User.name)
@ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorSchema })
@ApiNotFoundResponse({ description: 'Not found', type: ErrorSchema })
@ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
@ApiForbiddenResponse({ description: 'Forbidden', type: ErrorSchema })
export class UserMeController {
  constructor(private readonly useCase: UserMeUseCcase) {}

  @Get()
  @Scopes('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Show user info' })
  @ApiOkResponse({ description: 'User info', type: User })
  execute(@Headers() headers: HeadersInit): Observable<AxiosResponse<User>> {
    return this.useCase.execute(headers);
  }
}
