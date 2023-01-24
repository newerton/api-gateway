import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, OmitType } from '@nestjs/swagger';

import { UserCreateInput } from './user-create.dto';

export class UserUpdateInput extends PartialType(
  OmitType(UserCreateInput, [
    'email',
    'passwordCurrent',
    'repeatPasswordCurrent',
  ] as const),
) {
  @ApiProperty({
    example: 'Newerton',
  })
  readonly firstName: string;

  @ApiProperty({
    example: 'Vargas de Araujo',
  })
  readonly lastName: string;
}
