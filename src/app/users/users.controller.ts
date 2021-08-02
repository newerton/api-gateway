import {
  Controller,
  Post,
  HttpCode,
  Headers,
  Param,
  Put,
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
  ApiOperation,
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
import { ParseEmailPipe } from 'src/common/pipes/ParseEmail.pipe';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { MessageResponseSchema } from 'src/common/schemas/MessageResponse.schema';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('users')
@Controller('users')
@Resource(User.name)
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Scopes('create')
  @HttpCode(200)
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({ description: 'Created successfully', type: User })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorSchema })
  @ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
  @Public()
  create(@Payload() payload: CreateUserDto): Observable<AxiosResponse<User>> {
    return this.userService.create(payload);
  }

  @Put()
  @Scopes('update')
  @HttpCode(204)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user info' })
  @ApiNoContentResponse({ description: 'Updated successfully', type: User })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorSchema })
  @ApiNotFoundResponse({ description: 'Not found', type: ErrorSchema })
  @ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
  update(
    @Payload() payload: UpdateUserDto,
    @Headers() headers: HeadersInit,
  ): Observable<AxiosResponse<User>> {
    return this.userService.update(payload, headers);
  }

  @Put('change-password')
  @Scopes('change-password')
  @HttpCode(204)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change password' })
  @ApiNoContentResponse({ description: 'Updated successfully', type: User })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorSchema })
  @ApiNotFoundResponse({ description: 'Not found', type: ErrorSchema })
  @ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
  changePassword(
    @Payload() payload: ChangePasswordDto,
    @Headers() headers: HeadersInit,
  ): Observable<AxiosResponse<User>> {
    return this.userService.changePassword(payload, headers);
  }

  @Get()
  @Scopes('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Show user info' })
  @ApiOkResponse({ description: 'User info', type: User })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorSchema })
  @ApiNotFoundResponse({ description: 'Not found', type: ErrorSchema })
  @ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
  me(@Headers() headers: HeadersInit): Observable<AxiosResponse<User>> {
    return this.userService.me(headers);
  }

  @Post('forgot-password')
  @Scopes('forgot-password')
  @HttpCode(200)
  @ApiOperation({ summary: 'Forgot password' })
  @ApiOkResponse({ description: 'Message info', type: MessageResponseSchema })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorSchema })
  @ApiNotFoundResponse({ description: 'Not found', type: ErrorSchema })
  @ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
  @Public()
  forgotPassword(
    @Payload() payload: ForgotPasswordDto,
  ): Observable<AxiosResponse<User>> {
    return this.userService.forgotPassword(payload);
  }
}
