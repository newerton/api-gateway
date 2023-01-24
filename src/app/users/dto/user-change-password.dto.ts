import { ApiProperty } from '@nestjs/swagger';

export class UserChangePasswordInput {
  @ApiProperty({
    example: '123456',
  })
  readonly passwordCurrent: string;

  @ApiProperty({
    example: '123456',
  })
  readonly repeatPasswordCurrent: string;
}
