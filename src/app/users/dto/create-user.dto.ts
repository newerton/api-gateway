import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Newerton',
  })
  readonly firstName: string;

  @ApiProperty({
    example: 'Vargas de Araujo',
  })
  readonly lastName: string;

  @ApiProperty({
    example: 'newerton.araujo@gmail.com',
  })
  readonly email: string;

  @ApiProperty({
    example: '123456',
  })
  readonly passwordCurrent: string;

  @ApiProperty({
    example: '123456',
  })
  readonly repeatPasswordCurrent: string;

  @ApiProperty({
    example: 'abcdefg',
  })
  readonly deviceToken?: string;
}
