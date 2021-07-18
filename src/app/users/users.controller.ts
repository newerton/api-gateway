import {
  Controller,
  Get,
  Post,
  Body,
  OnModuleInit,
  Inject,
  Delete,
  Param,
  HttpCode,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { User } from './entities/user.entity';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/ParseMongoIdPipe';
import { UserService } from './users.service';
import { Resource, Roles, Scopes } from 'src/common/auth/keycloak';
import { ErrorSchema } from 'src/common/schemas/Error.schema';

@ApiTags('users')
@Controller('users')
@Resource(User.name)
export class UsersController implements OnModuleInit {
  constructor(
    @Inject('USER_SERVICE')
    private clientKafka: ClientKafka,
    private readonly userService: UserService,
  ) {}

  async onModuleInit() {
    const topics = [
      // 'users.create',
      'users.findbyemail',
      'users.findall',
      'users.findbyid',
      'users.update',
      'users.remove',
    ];

    topics.forEach(async (topic) => {
      this.clientKafka.subscribeToResponseOf(topic);
      await this.clientKafka.connect();
    });
  }

  // @Post()
  // @Scopes('create')
  // @HttpCode(201)
  // @ApiBearerAuth()
  // @ApiCreatedResponse({ description: 'Created successfully', type: User })
  // @ApiForbiddenResponse({ description: 'Unauthorized', type: ErrorSchema })
  // @ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
  // create(
  //   @Body()
  //   user: CreateUserDto,
  // ): Observable<User> {
  //   return this.userService.create(user);
  // }

  @Get()
  @Scopes('find-all')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'List all users', type: User })
  findAll(): Observable<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @Scopes('find-one')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'List one user by ID', type: User })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @Scopes('update')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Updated successfully', type: User })
  @ApiNotFoundResponse({ description: 'Not found', type: ErrorSchema })
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body()
    user: UpdateUserDto,
  ) {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  @Scopes('delete')
  @ApiBearerAuth()
  @HttpCode(204)
  @ApiNotFoundResponse({ description: 'Not found', type: ErrorSchema })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
