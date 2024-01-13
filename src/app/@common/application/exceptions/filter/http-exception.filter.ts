import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { CoreApiResponse } from '@core/@shared/domain/api/CoreApiResponse';
import { Code, CodeDescription } from '@core/@shared/domain/error/Code';
import { Exception } from '@core/@shared/domain/exception/Exception';
import { ApiServerConfig } from '@core/@shared/infrastructure/config/env';

type HttpExceptionFilterProperties = Error &
  CodeDescription & {
    details: Array<{ [key: string]: string }>;
  };

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  public catch(error: Error, host: ArgumentsHost): void {
    const request: Request = host.switchToHttp().getRequest();
    const response: Response = host.switchToHttp().getResponse<Response>();

    if (['dev', 'develop', 'development'].includes(ApiServerConfig.ENV)) {
      console.log(error);
    }

    let errorResponse: CoreApiResponse<unknown> = CoreApiResponse.error(
      Code.INTERNAL_SERVER_ERROR.code,
      Code.INTERNAL_SERVER_ERROR.error,
      error.message,
    );

    errorResponse = this.handleJSONException(
      error as HttpExceptionFilterProperties,
      errorResponse,
    );
    errorResponse = this.handleNestError(error, errorResponse);
    errorResponse = this.handleCoreException(error, errorResponse);
    errorResponse = this.handleAxiosException(error, errorResponse);

    if (ApiServerConfig.LOG_ENABLE && request) {
      const acceptableVersions = request.headers?.hasOwnProperty(
        'accept-version',
      )
        ? request.headers['accept-version']
        : '--';
      const message: string =
        `${request.method} ${request.path}; ` +
        `Error: ${errorResponse.error}; ` +
        `Version: ${acceptableVersions}; ` +
        `Message: ${errorResponse.message}`;

      Logger.error(message);
    }

    const validRanges = [
      [100, 511],
      [1000, 1004],
    ];
    const validRange = validRanges.find(
      ([start, end]) =>
        start <= errorResponse.code && errorResponse.code <= end,
    );
    let status = validRange ? errorResponse.code : 500;
    if (errorResponse.code > 511) {
      status = 500;
    }

    response.status(status).json(errorResponse);
  }

  private handleNestError(
    error: Error,
    errorResponse: CoreApiResponse<unknown>,
  ): CoreApiResponse<unknown> {
    if (error instanceof HttpException) {
      const findCode =
        Exception.findCodeByCodeValue(error.getStatus()) ||
        Code.INTERNAL_SERVER_ERROR;
      errorResponse = CoreApiResponse.error(
        findCode.code < 100 ? Code.INTERNAL_SERVER_ERROR.code : findCode.code,
        findCode.error || Code.INTERNAL_SERVER_ERROR.error,
        error.message,
        null,
      );
    }
    return errorResponse;
  }

  private handleCoreException(
    error: Error,
    errorResponse: CoreApiResponse<unknown>,
  ): CoreApiResponse<unknown> {
    if (error instanceof Exception) {
      const data = error.data
        ? Array.isArray(error.data)
          ? error.data
          : [error.data]
        : [];
      errorResponse = CoreApiResponse.error(
        error.code,
        error.error,
        error.message,
        data,
      );
    }

    return errorResponse;
  }

  private handleAxiosException(
    error: any,
    errorResponse: CoreApiResponse<unknown>,
  ): CoreApiResponse<unknown> {
    if (error.isAxiosError) {
      const hasErrorCodeStartingWithECONN = error.code
        ?.toString()
        .startsWith('ECONN');
      if (hasErrorCodeStartingWithECONN) {
        const data = error.config
          ? Array.isArray(error.config)
            ? error.config
            : [error.config]
          : [];
        errorResponse = CoreApiResponse.error(
          500,
          Code.INTERNAL_SERVER_ERROR.error,
          'Servidor não encontrado',
          data,
        );
        return errorResponse;
      }

      const findCode =
        Exception.findCodeByCodeValue(error.response.status) ||
        Code.INTERNAL_SERVER_ERROR;

      delete error.config.baseURL;
      delete error.config.method;

      let details = error.config
        ? Array.isArray(error.config)
          ? error.config
          : [error.config]
        : [];
      if (
        error.response.data.details &&
        error.response.data.details.length > 0
      ) {
        details = error.response.data.details;
      }
      errorResponse = CoreApiResponse.error(
        findCode.code,
        findCode.error,
        error.response.data.message || findCode.message,
        details,
      );
    }
    return errorResponse;
  }

  private handleJSONException(
    error: HttpExceptionFilterProperties,
    errorResponse: CoreApiResponse<unknown>,
  ): CoreApiResponse<unknown> {
    if (typeof error === 'object') {
      const code = typeof error.code === 'number' ? error.code : 500;
      const details = error.details
        ? Array.isArray(error.details)
          ? error.details
          : [error.details]
        : [];
      errorResponse = CoreApiResponse.error(
        code,
        error.error,
        error.message,
        details,
      );
    }

    return errorResponse;
  }
}
