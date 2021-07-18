import {
  Controller,
  Post,
  Body,
  OnModuleInit,
  Inject,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { Public, Resource, Scopes } from 'src/common/auth/keycloak';
import { ErrorSchema } from 'src/common/schemas/Error.schema';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Auth } from './entities/auth.entity';

@ApiTags('auth')
@Controller('auth')
@Resource(Auth.name)
export class AuthController implements OnModuleInit {
  constructor(
    @Inject('AUTH_SERVICE')
    private clientKafka: ClientKafka,
    private readonly authService: AuthService,
  ) {}

  async onModuleInit() {
    const topics = [
      'auth.login',
      'auth.refresh_token',
      'auth.credentials',
      'auth.users.create',
    ];

    topics.forEach(async (topic) => {
      this.clientKafka.subscribeToResponseOf(topic);
      await this.clientKafka.connect();
    });
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Login successfully.',
    type: Auth,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Public()
  @Scopes('login')
  login(@Body() login: LoginUserDto): Observable<Auth> {
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
  credentials(): Observable<Auth> {
    return this.authService.credentials();
  }

  @Post('users')
  @Scopes('create')
  @HttpCode(201)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Created successfully', type: User })
  @ApiForbiddenResponse({ description: 'Unauthorized', type: ErrorSchema })
  @ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
  @Public()
  create(
    @Body()
    user: CreateUserDto,
  ): Observable<User> {
    return this.authService.createUser(user);
  }
}
