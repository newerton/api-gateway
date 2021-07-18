import { ApiProperty } from '@nestjs/swagger';

export class ErrorSchema {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  error: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  details: Array<{ [key: string]: string | null }>;
}
