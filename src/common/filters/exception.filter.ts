import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception.response?.statusCode ||
      exception?.statusCode ||
      exception?.status ||
      400;
    const error = exception.message;

    const json = {
      statusCode: status,
      error,
      message: exception.message,
      details: [],
      ...(exception.response || exception || ''),
    };

    response.status(status).json(json);
  }
}
