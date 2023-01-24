import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseEmailPipe implements PipeTransform {
  transform(value: any) {
    const regex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!value.match(regex)) {
      throw new BadRequestException('Validation failed (email is invalid)');
    }
    return value;
  }
}
