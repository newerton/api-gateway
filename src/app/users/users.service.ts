import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { catchError, map } from 'rxjs/operators';
import { UnauthorizedException } from 'src/app.exceptions';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  baseUrl = this.configService.get<string>('keycloak.baseUrl');
  realm = this.configService.get<string>('keycloak.realm');

  url = `${this.baseUrl}/admin/realms/${this.realm}/users`;

  headers = {
    headers: {},
  };

  create(
    { firstName, lastName, email }: CreateUserDto,
    headers: { [key: string]: string },
  ): Observable<AxiosResponse<User>> {
    const payload = {
      username: email,
      firstName,
      lastName,
      email,
      groups: ['/User'],
      emailVerified: false,
      enabled: true,
    };

    this.headers.headers['Authorization'] = headers.authorization;

    return this.httpService.post(this.url, payload, this.headers).pipe(
      map((res) => res.data),
      catchError((e) => {
        throw new UnauthorizedException(e.response.data);
      }),
    );
  }
}
