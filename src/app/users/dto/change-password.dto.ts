import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({
    example: '123456',
  })
  readonly passwordCurrent: string;

  @ApiProperty({
    example: '123456',
  })
  readonly repeatPasswordCurrent: string;
}
