import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { JoiValidationException } from '../pipes/JoiValidation.pipe';

type ErrorProps = {
  statusCode: number;
  error: string;
  message: string;
  details: Array<{ [key: string]: any }>;
};

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    // console.log(exception, host);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const json = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Internal Server Error',
      message: 'Internal Server Error',
      details: [],
    };

    if (exception instanceof JoiValidationException) {
      const error = exception.getResponse() as ErrorProps;
      json.statusCode = exception.getStatus();
      json.error = JoiValidationException.name;
      json.message = error.message;
      json.details = error.details;
    } else if (typeof exception === 'string') {
      if (this.hasJsonStructure(exception)) {
        const error = JSON.parse(exception) as ErrorProps;
        json.statusCode = error.statusCode;
        json.error = error.error;
        json.message = error.message;
        json.details = error.details;
      } else {
        console.log(exception);
      }
    } else {
      console.log(exception);
      json.error = exception.error;
      json.message = exception.message;
      json.details = exception.details || [];
    }

    response.status(json.statusCode).json(json);
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
