import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  create(user: CreateUserDto): Observable<AxiosResponse<User>> {
    return this.client.send('users.create', { user });
  }

  update(
    user: UpdateUserDto,
    headers: HeadersInit,
  ): Observable<AxiosResponse<User>> {
    return this.client.send('users.update', { user, headers });
  }

  me(headers: HeadersInit): Observable<AxiosResponse<User>> {
    return this.client.send('users.me', { headers });
  }
}
