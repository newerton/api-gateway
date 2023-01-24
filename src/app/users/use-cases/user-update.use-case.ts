import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

import { UserUpdateInput } from '../dto/user-update.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserUpdateUseCase {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  execute(
    payload: UserUpdateInput,
    headers: HeadersInit,
  ): Observable<AxiosResponse<User>> {
    return this.client.send('users.update', { payload, headers });
  }
}
