import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

import { AuthCredentialsOutput } from '../dto/auth-crendetials.dto';

@Injectable()
export class AuthCredentialsUseCase {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  execute(): Observable<AxiosResponse<AuthCredentialsOutput>> {
    return this.client.send('auth.credentials', {});
  }
}
