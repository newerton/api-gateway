import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { AuthLoginProvidersInput } from '../dto/auth-login-providers.dto';
import { Auth } from '../entities/auth.entity';

@Injectable()
export class AuthLoginAppleUseCase {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  execute({
    accessToken,
    idToken,
    deviceToken,
  }: AuthLoginProvidersInput): Observable<Auth> {
    return this.client.send('auth.login.apple', {
      accessToken,
      idToken,
      deviceToken,
    });
  }
}
