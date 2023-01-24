import { ApiProperty } from '@nestjs/swagger';

export class UserForgotPasswordInput {
  @ApiProperty({
    example: 'newerton.araujo@gmail.com',
  })
  readonly email: string;
}
