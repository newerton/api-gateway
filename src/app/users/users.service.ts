import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE')
    private clientKafka: ClientKafka,
  ) {}

  create(user: CreateUserDto): Observable<User> {
    return this.clientKafka.send('users.create', user);
  }

  findByEmail(email: string): Observable<User> {
    return this.clientKafka.send('users.findbyemail', email);
  }

  findAll(): Observable<User[]> {
    return this.clientKafka.send('users.findall', {});
  }

  findOne(id: string): Observable<User> {
    return this.clientKafka.send('users.findbyid', { id });
  }

  update(id: string, user: UpdateUserDto): Observable<User> {
    return this.clientKafka.send('users.update', { id, user });
  }

  remove(id: string) {
    return this.clientKafka.send('users.remove', { id });
  }
}
