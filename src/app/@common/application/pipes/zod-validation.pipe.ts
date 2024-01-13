import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Schema, ZodError } from 'zod';

import { CreateValidationSchema } from '../validators/zod/schemas/create-schema.interface';

export type ZodValidationType = {
  message: string;
  details: any;
};

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  private readonly schema: Schema;

  constructor(schemaFactory: CreateValidationSchema) {
    this.schema = schemaFactory.createSchema() as Schema;
  }

  async transform(message: any): Promise<any> {
    try {
      await this.schema.parse(message);
    } catch (err) {
      let errors = {
        message: err?.message || err,
        details: err,
      };

      if (err instanceof ZodError) {
        const { issues } = err as ZodError;
        if (issues.length > 0) {
          errors = {
            message: issues[0].message,
            details: issues,
          };
        }
      }

      throw new ZodValidationException(errors);
    }

    return message;
  }
}

export class ZodValidationException extends HttpException {
  constructor(err: ZodValidationType) {
    super({ ...err }, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
