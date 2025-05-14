import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Validation failed (id is invalid)');
    }
    return value;
  }
}
