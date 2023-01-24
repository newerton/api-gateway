import { Code } from '../error/Code';

export class CoreApiResponse<T> {
  public readonly code: number;

  public readonly error: string;

  public readonly message: string;

  public readonly details: T[];

  private constructor(
    code: number,
    error: string,
    message: string,
    details?: any[],
  ) {
    this.code = code;
    this.error = error;
    this.message = message;
    this.details = details || [];
  }

  static success(data?: any): any {
    return data;
  }

  static error<T>(
    code?: number,
    error?: string,
    message?: string,
    details?: any[],
  ): CoreApiResponse<T> {
    const resultCode: number = code || Code.INTERNAL_ERROR.code;
    const resultError: string = error || Code.INTERNAL_ERROR.error;
    const resultMessage: string = message || Code.INTERNAL_ERROR.message;

    return new CoreApiResponse(resultCode, resultError, resultMessage, details);
  }
}
