import { Controller, HttpCode, Post } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

import { ErrorSchema } from '@app/@common/application/documentations/openapi/swagger/error.schema';
import { MessageResponseSchema } from '@app/@common/application/documentations/openapi/swagger/message-response.schema';
import {
  Public,
  Resource,
  Scopes,
} from '@app/@common/infrastructure/adapter/identity-and-access/keycloak';

import { UserForgotPasswordInput } from '../dto/user-forgot-password.dto';
import { User } from '../entities/user.entity';
import { UserForgotPasswordUseCase } from '../use-cases/user-forgot-password.use-case';

@ApiTags('users')
@Controller('users')
@Resource(User.name)
@ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorSchema })
@ApiNotFoundResponse({ description: 'Not found', type: ErrorSchema })
@ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
export class UserForgotPasswordController {
  constructor(private readonly useCase: UserForgotPasswordUseCase) {}

  @Post('forgot-password')
  @Scopes('forgot-password')
  @HttpCode(200)
  @Public()
  @ApiOperation({ summary: 'Forgot password' })
  @ApiOkResponse({ description: 'Message info', type: MessageResponseSchema })
  execute(
    @Payload() payload: UserForgotPasswordInput,
  ): Observable<AxiosResponse<User>> {
    return this.useCase.execute(payload);
  }
}
