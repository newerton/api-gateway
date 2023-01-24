import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginProvidersInput {
  @ApiProperty()
  readonly accessToken: string;

  @ApiProperty()
  readonly idToken: string;

  @ApiProperty({
    example: 'abcdefg',
  })
  readonly deviceToken?: string;
}
