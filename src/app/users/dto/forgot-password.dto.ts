import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({
    example: 'newerton.araujo@gmail.com',
  })
  readonly email: string;
}
