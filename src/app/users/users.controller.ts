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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/ParseMongoIdPipe';

@ApiTags('users')
@Controller('users')
export class UsersController implements OnModuleInit {
  constructor(
    @Inject('USER_SERVICE')
    private clientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    const topics = [
      'CREATE_USER',
      'UPDATE_USER',
      'FIND_ALL_USER',
      'FIND_USER_BY_ID',
      'REMOVE_USER',
    ];

    topics.forEach(async (topic) => {
      this.clientKafka.subscribeToResponseOf(topic);
      await this.clientKafka.connect();
    });
  }

  @Post()
  @HttpCode(201)
  create(
    @Body()
    user: CreateUserDto,
  ): Observable<User[]> {
    return this.clientKafka.send('CREATE_USER', user);
  }

  @Get()
  findAll(): Observable<User> {
    return this.clientKafka.send('FIND_ALL_USER', {});
  }

  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.clientKafka.send('FIND_USER_BY_ID', { id });
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body()
    data: UpdateUserDto,
  ) {
    return this.clientKafka.send('UPDATE_USER', { id, data });
  }

  @Delete(':id')
  @ApiBearerAuth()
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.clientKafka.send('REMOVE_USER', { id });
  }
}
