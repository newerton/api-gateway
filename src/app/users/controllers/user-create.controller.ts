import { Controller, HttpCode, Post } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

import { ErrorSchema } from '@app/@common/application/documentations/openapi/swagger/error.schema';
import {
  Public,
  Resource,
  Scopes,
} from '@app/@common/infrastructure/adapter/identity-and-access/keycloak';

import { UserCreateInput, UserCreateOutput } from '../dto/user-create.dto';
import { User } from '../entities/user.entity';
import { UserCreateUseCase } from '../use-cases/user-create.use-case';

@ApiTags('users')
@Controller('users')
@Resource(User.name)
@ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorSchema })
@ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
@ApiConflictResponse({ description: 'Conflict', type: ErrorSchema })
export class UserCreateController {
  constructor(private readonly useCase: UserCreateUseCase) {}

  @Post()
  @Scopes('create')
  @HttpCode(200)
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({
    description: 'Created successfully',
    type: UserCreateOutput,
  })
  @Public()
  execute(
    @Payload() payload: UserCreateInput,
  ): Observable<AxiosResponse<UserCreateOutput>> {
    return this.useCase.execute(payload);
  }
}
