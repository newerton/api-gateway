import { HttpException, HttpStatus } from '@nestjs/common';

type ValidationType = {
  message: string;
  details: any;
};

export class AppException extends HttpException {}

/**
 * Doc: https://cloud.google.com/apis/design/errors#handling_errors
 */
export class UnauthorizedException extends AppException {
  constructor(message: Array<string>) {
    super(
      {
        error: 'Unauthorized',
        message: 'Dados inválido.',
        details: [message],
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class JoiValidationException extends AppException {
  constructor(err: ValidationType) {
    super(
      {
        error: 'Unprocessable Entity',
        ...err,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
