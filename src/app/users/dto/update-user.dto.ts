import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, [
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
