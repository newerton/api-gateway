import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

import { UserChangePasswordInput } from '../dto/user-change-password.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserChangePasswordUseCase {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  execute(
    payload: UserChangePasswordInput,
    headers: HeadersInit,
  ): Observable<AxiosResponse<User>> {
    return this.client.send('users.change_password', { payload, headers });
  }
}
