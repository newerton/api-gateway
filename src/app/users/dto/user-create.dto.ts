import { ApiProperty } from '@nestjs/swagger';

export class UserCreateInput {
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
    example: true,
  })
  readonly emailVerified?: boolean;

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

export class UserCreateOutput {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdTimestamp: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  enabled: boolean;

  @ApiProperty()
  totp: boolean;

  @ApiProperty()
  emailVerified: boolean;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  attributes: { [key: string]: string };

  @ApiProperty()
  disableableCredentialTypes: Array<string>;

  @ApiProperty()
  requiredActions: Array<string>;

  @ApiProperty()
  notBefore: number;

  @ApiProperty()
  access: { [key: string]: string };
}
