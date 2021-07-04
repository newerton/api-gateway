import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, [
    'email',
    'password_current',
    'repeat_password_current',
  ] as const),
) {
  @ApiProperty({
    example: 'Newerton',
  })
  readonly name: string;

  @ApiProperty({
    example: 'Vargas de Araujo',
  })
  readonly last_name: string;
}
