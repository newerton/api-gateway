import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginUserInput {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly password: string;

  @ApiProperty({
    example: 'abcdefg',
  })
  readonly deviceToken?: string;
}
