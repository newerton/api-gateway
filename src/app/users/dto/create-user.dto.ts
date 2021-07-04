import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Newerton',
  })
  readonly name: string;

  @ApiProperty({
    example: 'Vargas de Araujo',
  })
  readonly last_name: string;

  @ApiProperty({
    example: 'newerton.araujo@gmail.com',
  })
  readonly email: string;

  @ApiProperty({
    example: '123456',
  })
  readonly password_current: string;

  @ApiProperty({
    example: '123456',
  })
  readonly repeat_password_current: string;

  @ApiProperty({
    example: 'abcdefg',
  })
  readonly device_token?: string;
}
