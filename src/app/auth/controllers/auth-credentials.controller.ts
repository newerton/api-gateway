import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AxiosResponse } from 'axios';
import { Resource } from 'nest-keycloak-connect';
import { Public, Scopes } from 'nest-keycloak-connect/keycloak-connect.module';
import { Observable } from 'rxjs';

import { AuthCredentialsOutput } from '../dto/auth-crendetials.dto';
import { Auth } from '../entities/auth.entity';
import { AuthCredentialsUseCase } from '../use-cases/auth-credentials.use-case';

@ApiTags('auth')
@Controller('auth')
@Resource(Auth.name)
export class AuthCredentialsController {
  constructor(private readonly useCase: AuthCredentialsUseCase) {}

  @Get('credentials')
  @Scopes('credentials')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create user credentials (Expire in 15 seconds)' })
  @ApiOkResponse({
    description: 'Created successfully',
    type: AuthCredentialsOutput,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  execute(): Observable<AxiosResponse<AuthCredentialsOutput>> {
    return this.useCase.execute();
  }
}
