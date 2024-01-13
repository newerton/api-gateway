import { Code } from '../error/Code';
import { Optional } from '../type/CommonTypes';

export type CreateExceptionPayload<T> = {
  code: number;
  overrideMessage?: string;
  data?: T;
};

export class Exception<T> extends Error {
  public readonly code: number;

  public readonly error: string;

  public readonly data: Optional<T>;

  private constructor(code: number, overrideMessage?: string, data?: T) {
    super();
    this.name = this.constructor.name;

    const error = Exception.findCodeByCodeValue(code);
    if (!error) {
      this.code = Code.INTERNAL_SERVER_ERROR.code;
      this.error = Code.INTERNAL_SERVER_ERROR.message;
      this.message = 'Status code not found';
    } else {
      this.code = error.code;
      this.error = error.error;
      this.message = overrideMessage || error.message;
      this.data = data;
    }

    Error.captureStackTrace(this, this.constructor);
  }

  public static new<T>(payload: CreateExceptionPayload<T>): Exception<T> {
    return new Exception(payload.code, payload.overrideMessage, payload.data);
  }

  public static findCodeByCodeValue = (codeValue: number) =>
    Object.values(Code).find(({ code }) => code === codeValue);
}
