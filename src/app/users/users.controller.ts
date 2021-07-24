import {
  Controller,
  Post,
  HttpCode,
  Headers,
  Patch,
  Param,
  Body,
  Put,
  ParseUUIDPipe,
  Get,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserService } from './users.service';
import { Public, Resource, Scopes } from 'src/common/auth/keycloak';
import { ErrorSchema } from 'src/common/schemas/Error.schema';
import { Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('users')
@Resource(User.name)
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Scopes('create')
  @HttpCode(200)
  @ApiCreatedResponse({ description: 'Created successfully', type: User })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorSchema })
  @ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
  @Public()
  create(@Payload() user: CreateUserDto): Observable<AxiosResponse<User>> {
    return this.userService.create(user);
  }

  @Put()
  @Scopes('update')
  @HttpCode(204)
  @ApiBearerAuth()
  @ApiNoContentResponse({ description: 'Updated successfully', type: User })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorSchema })
  @ApiNotFoundResponse({ description: 'Not found', type: ErrorSchema })
  @ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
  update(
    @Payload() user: UpdateUserDto,
    @Headers() headers: HeadersInit,
  ): Observable<AxiosResponse<User>> {
    return this.userService.update(user, headers);
  }

  @Get()
  @Scopes('me')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User info', type: User })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorSchema })
  @ApiNotFoundResponse({ description: 'Not found', type: ErrorSchema })
  @ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
  me(@Headers() headers: HeadersInit): Observable<AxiosResponse<User>> {
    return this.userService.me(headers);
  }
}
