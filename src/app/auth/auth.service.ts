import { Inject, Injectable } from '@nestjs/common';
import { Auth } from './entities/auth.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { LoginWithProvidersDto } from './dto/login-with-providers.dto';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  credentials(): Observable<AxiosResponse<Auth>> {
    return this.client.send('auth.credentials', {});
  }

  login({ email, password, deviceToken }: LoginUserDto): Observable<Auth> {
    return this.client.send('auth.login', { email, password, deviceToken });
  }

  loginWithFacebook({
    accessToken,
    deviceToken,
  }: LoginWithProvidersDto): Observable<Auth> {
    return this.client.send('auth.login.facebook', {
      accessToken,
      deviceToken,
    });
  }

  loginWithGoogle({
    accessToken,
    deviceToken,
  }: LoginWithProvidersDto): Observable<Auth> {
    return this.client.send('auth.login.google', {
      accessToken,
      deviceToken,
    });
  }

  loginWithApple({
    accessToken,
    idToken,
    deviceToken,
  }: LoginWithProvidersDto): Observable<Auth> {
    return this.client.send('auth.login.apple', {
      accessToken,
      idToken,
      deviceToken,
    });
  }
}
