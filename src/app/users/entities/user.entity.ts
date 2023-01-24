import { ApiProperty } from '@nestjs/swagger';

export class User {
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
}
