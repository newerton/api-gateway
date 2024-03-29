import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public, Resource, Scopes } from 'nest-keycloak-connect';
import { Observable } from 'rxjs';

import { AuthLoginProvidersInput } from '../dto/auth-login-providers.dto';
import { Auth } from '../entities/auth.entity';
import { AuthLoginAppleUseCase } from '../use-cases/auth-login-apple.use-case';

@ApiTags('auth')
@Controller('auth')
@Resource(Auth.name)
export class AuthLoginAppleController {
  constructor(private readonly useCase: AuthLoginAppleUseCase) {}

  @Post('login/apple')
  @Scopes('login-apple')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with Apple' })
  @ApiOkResponse({
    description: 'Login successfully',
    type: Auth,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  execute(@Payload() login: AuthLoginProvidersInput): Observable<Auth> {
    return this.useCase.execute(login);
  }
}
