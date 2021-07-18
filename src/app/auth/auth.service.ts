import * as qs from 'qs';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Auth } from './entities/auth.entity';
import { ConfigService } from '@nestjs/config';
import { LoginUserDto } from './dto/login-user.dto';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { catchError, map, Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  baseUrl = this.configService.get<string>('keycloak.baseUrl');
  realm = this.configService.get<string>('keycloak.realm');

  url = `${this.baseUrl}/realms/${this.realm}/protocol/openid-connect/token`;

  headers = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  };

  login({ email, password }: LoginUserDto): Observable<AxiosResponse<Auth>> {
    const payload = qs.stringify({
      grant_type: 'password',
      client_id: this.configService.get<string>('keycloak.clientId'),
      client_secret: this.configService.get<string>('keycloak.secret'),
      scope: 'openid email profile',
      username: email,
      password: password,
    });
    return this.httpService.post(this.url, payload, this.headers).pipe(
      map((res) => res.data),
      catchError((e) => {
        throw new UnauthorizedException(e.response.data);
      }),
    );
  }

  credentials(): Observable<AxiosResponse<Auth>> {
    const payload = qs.stringify({
      client_id: this.configService.get<string>(
        'keycloak.user_credentials.clientId',
      ),
      client_secret: this.configService.get<string>(
        'keycloak.user_credentials.secret',
      ),
      grant_type: this.configService.get<string>(
        'keycloak.user_credentials.grant_type',
      ),
    });

    return this.httpService.post(this.url, payload, this.headers).pipe(
      map((res) => res.data),
      catchError((e) => {
        throw new UnauthorizedException(e.response.data);
      }),
    );
  }
}
