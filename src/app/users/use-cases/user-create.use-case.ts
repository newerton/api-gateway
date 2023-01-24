import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

import { UserCreateInput, UserCreateOutput } from '../dto/user-create.dto';

@Injectable()
export class UserCreateUseCase {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  execute(
    payload: UserCreateInput,
  ): Observable<AxiosResponse<UserCreateOutput>> {
    return this.client.send('users.create', { payload });
  }
}
