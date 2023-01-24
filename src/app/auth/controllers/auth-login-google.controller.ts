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

import { AuthLoginProvidersInput } from '../dto/auth-login-providers.dto';
import { Auth } from '../entities/auth.entity';
import { AuthLoginGoogleUseCase } from '../use-cases/auth-login-google.use-case';

@ApiTags('auth')
@Controller('auth')
@Resource(Auth.name)
export class AuthLoginGoogleController {
  constructor(private readonly useCase: AuthLoginGoogleUseCase) {}

  @Post('login/google')
  @Scopes('login-google')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with Google' })
  @ApiOkResponse({
    description: 'Login successfully',
    type: Auth,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  execute(@Payload() login: AuthLoginProvidersInput): Observable<Auth> {
    return this.useCase.execute(login);
  }
}
