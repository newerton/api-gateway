import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  create(
    user: CreateUserDto,
    headers: HeadersInit,
  ): Observable<AxiosResponse<User>> {
    return this.client.send('auth.users.create', { user, headers });
  }
}
