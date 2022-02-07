import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { JoiValidationException } from '../pipes/JoiValidation.pipe';

@Catch(JoiValidationException)
export class JoiValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as any;

    const json = {
      statusCode: status,
      error: JoiValidationException.name,
      message: exception.message,
      ...exceptionResponse,
    };

    response.status(status).json(json);
  }
}
