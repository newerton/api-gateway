import * as JoiBase from 'joi';
import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateSchema } from '../schemas/joi/products/joi.create.schema.factory';

type ValidationType = {
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
