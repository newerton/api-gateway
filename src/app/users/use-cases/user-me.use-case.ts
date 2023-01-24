import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

import { User } from '../entities/user.entity';

@Injectable()
export class UserMeUseCcase {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  execute(headers: HeadersInit): Observable<AxiosResponse<User>> {
    return this.client.send('users.me', { headers });
  }
}
