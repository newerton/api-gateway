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
  @Scopes('credentials')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create user credentials (Expire in 15 seconds)' })
  @ApiOkResponse({
    description: 'Created successfully',
    type: Auth,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  credentials(): Observable<AxiosResponse<Auth>> {
    return this.authService.credentials();
  }

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
  login(@Payload() login: LoginUserDto): Observable<Auth> {
    return this.authService.login(login);
  }

  @Post('login/facebook')
  @Scopes('login-facebook')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with Facebook' })
  @ApiOkResponse({
    description: 'Login successfully',
    type: Auth,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  loginWithFacebook(@Payload() login: LoginWithProvidersDto): Observable<Auth> {
    return this.authService.loginWithFacebook(login);
  }

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
  loginWithGoogle(@Payload() login: LoginWithProvidersDto): Observable<Auth> {
    return this.authService.loginWithGoogle(login);
  }

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
  loginWithApple(@Payload() login: LoginWithProvidersDto): Observable<Auth> {
    return this.authService.loginWithApple(login);
  }
}
