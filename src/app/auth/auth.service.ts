import { Inject, Injectable } from '@nestjs/common';
import { Auth } from './entities/auth.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  login({ email, password }: LoginUserDto): Observable<Auth> {
    return this.client.send('auth.login', { email, password });
  }

  credentials(): Observable<AxiosResponse<Auth>> {
    return this.client.send('auth.credentials', {});
  }
}
