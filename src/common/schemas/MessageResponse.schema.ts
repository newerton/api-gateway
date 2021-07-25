import { ApiProperty } from '@nestjs/swagger';

export class MessageResponseSchema {
  @ApiProperty()
  message: string;
}
