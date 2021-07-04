import { Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Catch()
export class ExceptionFilter extends BaseRpcExceptionFilter {
  catch(exception: any, host: ArgumentsHost): Observable<unknown> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR;
    return response.status(status).json(exception);
  }
}
