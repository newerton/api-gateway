import { Controller, Post, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public, Resource, Scopes } from 'src/common/auth/keycloak';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Auth } from './entities/auth.entity';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { LoginWithProvidersDto } from './dto/login-with-providers.dto';

@ApiTags('auth')
@Controller('auth')
@Resource(Auth.name)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('credentials')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create user credentials (Expire in 15 seconds)' })
  @ApiOkResponse({
    description: 'Created successfully',
    type: Auth,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Public()
  @Scopes('credentials')
  credentials(): Observable<AxiosResponse<Auth>> {
    return this.authService.credentials();
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email' })
  @ApiOkResponse({
    description: 'Login successfully',
    type: Auth,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Public()
  @Scopes('login')
  login(@Payload() login: LoginUserDto): Observable<Auth> {
    return this.authService.login(login);
  }

  @Post('login/facebook')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with Facebook' })
  @ApiOkResponse({
    description: 'Login successfully',
    type: Auth,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Public()
  @Scopes('login-facebook')
  loginWithFacebook(@Payload() login: LoginWithProvidersDto): Observable<Auth> {
    return this.authService.loginWithFacebook(login);
  }

  @Post('login/google')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with Google' })
  @ApiOkResponse({
    description: 'Login successfully',
    type: Auth,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Public()
  @Scopes('login-google')
  loginWithGoogle(@Payload() login: LoginWithProvidersDto): Observable<Auth> {
    return this.authService.loginWithGoogle(login);
  }

  @Post('login/apple')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with Apple' })
  @ApiOkResponse({
    description: 'Login successfully',
    type: Auth,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Public()
  @Scopes('login-apple')
  loginWithApple(@Payload() login: LoginWithProvidersDto): Observable<Auth> {
    return this.authService.loginWithApple(login);
  }
}
