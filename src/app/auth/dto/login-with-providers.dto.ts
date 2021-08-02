import { ApiProperty } from '@nestjs/swagger';

export class LoginWithProvidersDto {
  @ApiProperty()
  readonly accessToken: string;

  @ApiProperty()
  readonly idToken: string;

  @ApiProperty({
    example: 'abcdefg',
  })
  readonly deviceToken?: string;
}
