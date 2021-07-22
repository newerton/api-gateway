import { Controller, Post, HttpCode, Headers } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserService } from './users.service';
import { Public, Resource, Scopes } from 'src/common/auth/keycloak';
import { ErrorSchema } from 'src/common/schemas/Error.schema';
import { Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@ApiTags('users')
@Controller('users')
@Resource(User.name)
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Scopes('create')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Created successfully', type: User })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorSchema })
  @ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
  @Public()
  create(
    @Payload() user: CreateUserDto,
    @Headers() headers: HeadersInit,
  ): Observable<AxiosResponse<User>> {
    return this.userService.create(user, headers);
  }

  // @Patch(':id')
  // @Scopes('update')
  // @ApiBearerAuth()
  // @ApiOkResponse({ description: 'Updated successfully', type: User })
  // @ApiNotFoundResponse({ description: 'Not found', type: ErrorSchema })
  // update(
  //   @Param('id', ParseMongoIdPipe) id: string,
  //   @Body()
  //   user: UpdateUserDto,
  // ) {
  //   return this.userService.update(id, user);
  // }
}
