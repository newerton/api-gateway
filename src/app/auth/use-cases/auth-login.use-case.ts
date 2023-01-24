import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { AuthLoginUserInput } from '../dto/auth-login-user.dto';
import { Auth } from '../entities/auth.entity';

@Injectable()
export class AuthLoginUseCase {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  execute({
    email,
    password,
    deviceToken,
  }: AuthLoginUserInput): Observable<Auth> {
    return this.client.send('auth.login', { email, password, deviceToken });
  }
}
