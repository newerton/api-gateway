import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = 500;
    let json = {
      statusCode: status,
      error: '',
      message: '',
      details: [],
    };

    if (!this.hasJsonStructure(exception)) {
      const error = exception;
      json = {
        statusCode: status,
        error,
        message: error,
        details: [],
      };
    } else {
      const error = JSON.parse(exception);
      status =
        error.response?.statusCode || error?.statusCode || error?.status || 400;

      json = {
        statusCode: status,
        error: error.message,
        message: error.message,
        details: [],
        ...(error.response || error || ''),
      };
    }

    response.status(status).json(json);
  }

  hasJsonStructure(str: any) {
    if (typeof str !== 'string') return false;
    try {
      const result = JSON.parse(str);
      const type = Object.prototype.toString.call(result);
      return type === '[object Object]' || type === '[object Array]';
    } catch (err) {
      return false;
    }
  }
}
