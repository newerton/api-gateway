import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateUserDto } from './dto/update-user.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UserService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  create(payload: CreateUserDto): Observable<AxiosResponse<User>> {
    return this.client.send('users.create', { payload });
  }

  update(
    payload: UpdateUserDto,
    headers: HeadersInit,
  ): Observable<AxiosResponse<User>> {
    return this.client.send('users.update', { payload, headers });
  }

  me(headers: HeadersInit): Observable<AxiosResponse<User>> {
    return this.client.send('users.me', { headers });
  }

  forgotPassword(payload: ForgotPasswordDto): Observable<AxiosResponse<User>> {
    return this.client.send('users.forgot_password', { payload });
  }

  changePassword(
    payload: ChangePasswordDto,
    headers: HeadersInit,
  ): Observable<AxiosResponse<User>> {
    return this.client.send('users.change_password', { payload, headers });
  }
}
