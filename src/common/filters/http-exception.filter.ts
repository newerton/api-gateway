import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as any;

    const json = {
      statusCode: status,
      error: '',
      message: '',
      details: [],
    };

    if (exceptionResponse?.message) {
      json.message = exceptionResponse.message;
    }

    if (exceptionResponse?.error) {
      json.error = exceptionResponse.error;
    }

    if (exceptionResponse?.details) {
      json.details = exceptionResponse.details;
    }

    response.status(status).json(json);
  }
}
