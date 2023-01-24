import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Resource } from 'nest-keycloak-connect';
import { Public, Scopes } from 'nest-keycloak-connect/keycloak-connect.module';
import { Observable } from 'rxjs';

import { AuthLoginUserInput } from '../dto/auth-login-user.dto';
import { Auth } from '../entities/auth.entity';
import { AuthLoginUseCase } from '../use-cases/auth-login.use-case';

@ApiTags('auth')
@Controller('auth')
@Resource(Auth.name)
export class AuthLoginController {
  constructor(private readonly useCase: AuthLoginUseCase) {}

  @Post('login')
  @Scopes('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email' })
  @ApiOkResponse({
    description: 'Login successfully',
    type: Auth,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  execute(@Payload() login: AuthLoginUserInput): Observable<Auth> {
    return this.useCase.execute(login);
  }
}
