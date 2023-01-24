import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

import { JoiValidationException } from '../../pipes/joi-validation.pipe';

@Catch(JoiValidationException)
export class JoiValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as any;

    const json = {
      code: status,
      error: 'JOI_VALIDATION_EXCEPTION',
      message: exception.message,
      ...exceptionResponse,
    };

    response.status(status).json(json);
  }
}
