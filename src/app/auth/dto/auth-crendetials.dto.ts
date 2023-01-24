import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsOutput {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  expires_in: number;

  @ApiProperty()
  refresh_expires_in: number;

  @ApiProperty()
  token_type: string;

  @ApiProperty()
  'not-before-policy': number;

  @ApiProperty()
  scope: string;
}
