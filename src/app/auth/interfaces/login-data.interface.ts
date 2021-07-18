import { CreateUserDto } from 'src/app/users/dto/create-user.dto';

export interface ILoginData {
  userInfo: CreateUserDto;
  accessToken: string;
}
