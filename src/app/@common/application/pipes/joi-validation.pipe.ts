import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import * as JoiBase from 'joi';

import { CreateSchema } from '@app/@common/application/validators/joi/schemas/joi.create-schema.interface';

export type ValidationType = {
  message: string;
  details: any;
};

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  private readonly schema: JoiBase.AnySchema;

  constructor(private schemaFactory: CreateSchema) {
    this.schema = schemaFactory.createSchema();
  }

  async transform(message: any): Promise<any> {
    try {
      await this.schema.validateAsync(message);
    } catch (err) {
      const errors = {
        message: err?.message || err,
        details: err?.details,
      };
      throw new JoiValidationException(errors);
    }

    return message;
  }
}

export class JoiValidationException extends HttpException {
  constructor(err: ValidationType) {
    super({ ...err }, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
