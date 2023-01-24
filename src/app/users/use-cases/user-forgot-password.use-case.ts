import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

import { UserForgotPasswordInput } from '../dto/user-forgot-password.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserForgotPasswordUseCase {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  execute(payload: UserForgotPasswordInput): Observable<AxiosResponse<User>> {
    return this.client.send('users.forgot_password', { payload });
  }
}
