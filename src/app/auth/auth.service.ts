import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE')
    private clientKafka: ClientKafka,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  login(data: LoginUserDto): Observable<Auth> {
    return this.clientKafka.send('auth.login', data);
  }

  credentials(): Observable<Auth> {
    return this.clientKafka.send('auth.credentials', {});
  }

  createUser(user: CreateUserDto): Observable<User> {
    return this.clientKafka.send('auth.users.create', user);
  }
}
