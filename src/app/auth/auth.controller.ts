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

@ApiTags('auth')
@Controller('auth')
@Resource(Auth.name)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Login successfully.',
    type: Auth,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Public()
  @Scopes('login')
  login(@Payload() login: LoginUserDto): Observable<Auth> {
    return this.authService.login(login);
  }

  @Get('credentials')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create user credentials (Expire in 15 seconds).' })
  @ApiOkResponse({
    description: 'Created successfully',
    type: Auth,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Public()
  @Scopes('credentials')
  credentials(): Observable<AxiosResponse<Auth>> {
    return this.authService.credentials();
  }
}
