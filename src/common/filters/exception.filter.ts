import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const error = JSON.parse(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      error.response?.statusCode || error?.statusCode || error?.status || 400;

    const json = {
      statusCode: status,
      error: error.message,
      message: error.message,
      details: [],
      ...(error.response || error || ''),
    };

    response.status(status).json(json);
  }
}
