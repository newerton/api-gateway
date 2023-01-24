import { CodeDescription } from '../error/Code';
import { Optional } from '../type/CommonTypes';

export type CreateExceptionPayload<T> = {
  code: CodeDescription;
  overrideMessage?: string;
  data?: T;
};

export class Exception<T> extends Error {
  public readonly code: number;

  public readonly error: string;

  public readonly data: Optional<T>;

  private constructor(
    codeDescription: CodeDescription,
    overrideMessage?: string,
    data?: T,
  ) {
    super();

    this.name = this.constructor.name;
    this.code = codeDescription.code;
    this.error = codeDescription.error;
    this.message = overrideMessage || codeDescription.message;
    this.data = data;

    Error.captureStackTrace(this, this.constructor);
  }

  public static new<T>(payload: CreateExceptionPayload<T>): Exception<T> {
    return new Exception(payload.code, payload.overrideMessage, payload.data);
  }
}
