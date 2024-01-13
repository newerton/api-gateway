import { ApiProperty } from '@nestjs/swagger';

export class MessageResponseSchema {
  @ApiProperty({ type: 'string' })
  message: string;
}
