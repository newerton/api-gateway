import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const IGNORED_ROUTES: string[] = ['/healthcheck'];
@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<void> {
    const request: Request = context.switchToHttp().getRequest();
    const requestStartDate: number = Date.now();

    if (
      request.method &&
      request.path &&
      !IGNORED_ROUTES.includes(request.path)
    ) {
      return next.handle().pipe(tap(this.tapLogger(request, requestStartDate)));
    } else {
      return next.handle();
    }
  }

  public tapLogger(request: Request, requestStartDate: number) {
    return (): void => {
      const message: string = this.message(request, requestStartDate);
      Logger.log(message, HttpLoggingInterceptor.name);
    };
  }

  public message(request: Request, requestStartDate: number) {
    const requestFinishDate: number = Date.now();
    const message: string =
      `Method: ${request.method}; ` +
      `Path: ${request.path}; ` +
      `SpentTime: ${requestFinishDate - requestStartDate}ms`;

    return message;
  }
}
