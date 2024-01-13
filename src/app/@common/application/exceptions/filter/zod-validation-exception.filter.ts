import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

import { ZodValidationException } from '../../pipes';

@Catch(ZodValidationException)
export class ZodValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as any;

    const json = {
      code: status,
      error: 'ZOD_VALIDATION_EXCEPTION',
      message: exception.message,
      ...exceptionResponse,
    };

    response.status(status).json(json);
  }
}
