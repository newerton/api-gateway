export type CodeDescription = {
  code: number;
  error: string;
  message: string;
};

export class Code {
  // INFORMATION RESPONSES

  static CONTINUE: CodeDescription = {
    code: 100,
    error: 'CONTINUE',
    message: 'Continue',
  };

  static SWITCHING_PROTOCOLS: CodeDescription = {
    code: 101,
    error: 'SWITCHING_PROTOCOLS',
    message: 'Switching protocols',
  };

  static PROCESSING_WEBDAV: CodeDescription = {
    code: 102,
    error: 'PROCESSING_WEBDAV',
    message: 'Processing (WebDAV)',
  };

  static EARLY_HINTS: CodeDescription = {
    code: 103,
    error: 'EARLY_HINTS',
    message: 'Early hints',
  };

  // SUCCESSFUL RESPONSE

  static SUCCESS: CodeDescription = {
    code: 200,
    error: 'SUCCESS',
    message: 'Success',
  };

  static CREATED: CodeDescription = {
    code: 201,
    error: 'CREATED',
    message: 'Created',
  };

  static ACCEPTED: CodeDescription = {
    code: 202,
    error: 'ACCEPTED',
    message: 'Accepted',
  };

  static NON_AUTHORITATIVE_INFORMATION: CodeDescription = {
    code: 203,
    error: 'NON_AUTHORITATIVE_INFORMATION',
    message: 'Non-Authoritative information',
  };

  static NO_CONTENT: CodeDescription = {
    code: 204,
    error: 'NO_CONTENT',
    message: 'No content',
  };

  static RESET_CONTENT: CodeDescription = {
    code: 205,
    error: 'RESET_CONTENT',
    message: 'Reset content',
  };

  static PARTIAL_CONTENT: CodeDescription = {
    code: 206,
    error: 'PARTIAL_CONTENT',
    message: 'Partial content',
  };

  static MULTI_STATUS_WEBDAV: CodeDescription = {
    code: 207,
    error: 'MULTI_STATUS_WEBDAV',
    message: 'Multi-Status (WebDAV)',
  };

  static ALREADY_REPORTED_WEBDAV: CodeDescription = {
    code: 208,
    error: 'ALREADY_REPORTED_WEBDAV',
    message: 'Already reported (WebDAV)',
  };

  static IM_USED_HTTP_DELTA_ENCODING: CodeDescription = {
    code: 226,
    error: 'IM_USED_HTTP_DELTA_ENCODING',
    message: 'IM used (HTTP Delta encoding)',
  };

  // REDIRECTION MESSAGES

  static MULTIPLE_CHOICES: CodeDescription = {
    code: 300,
    error: 'MULTIPLE_CHOICES',
    message: 'Multiple choices',
  };

  static MOVED_PERMANENTLY: CodeDescription = {
    code: 301,
    error: 'MOVED_PERMANENTLY',
    message: 'Moved permanently',
  };

  static FOUND: CodeDescription = {
    code: 302,
    error: 'FOUND',
    message: 'Found',
  };

  static SEE_OTHER: CodeDescription = {
    code: 303,
    error: 'SEE_OTHER',
    message: 'See other',
  };

  static NOT_MODIFIED: CodeDescription = {
    code: 304,
    error: 'NOT_MODIFIED',
    message: 'Not modified',
  };

  static USE_PROXY_DEPRECATED: CodeDescription = {
    code: 305,
    error: 'USE_PROXY_DEPRECATED',
    message: 'Use proxy deprecated',
  };

  static UNUSED: CodeDescription = {
    code: 306,
    error: 'UNUSED',
    message: 'Unused',
  };

  static TEMPORARY_REDIRECT: CodeDescription = {
    code: 307,
    error: 'TEMPORARY_REDIRECT',
    message: 'Temporary redirect',
  };

  static PERMANENT_REDIRECT: CodeDescription = {
    code: 308,
    error: 'PERMANENT_REDIRECT',
    message: 'Permanent redirect',
  };

  // CLIENT ERROR RESPONSE

  static BAD_REQUEST: CodeDescription = {
    code: 400,
    error: 'BAD_REQUEST',
    message: 'Bad request',
  };

  static UNAUTHORIZED: CodeDescription = {
    code: 401,
    error: 'UNAUTHORIZED',
    message: 'Unauthorized error',
  };

  static PAYMENT_REQUIRED: CodeDescription = {
    code: 402,
    error: 'PAYMENT_REQUIRED',
    message: 'Payment required',
  };

  static FORBIDDEN: CodeDescription = {
    code: 403,
    error: 'FORBIDDEN',
    message: 'Forbidden',
  };

  static NOT_FOUND: CodeDescription = {
    code: 404,
    error: 'NOT_FOUND',
    message: 'Not found',
  };

  static METHOD_NOT_ALLOWED: CodeDescription = {
    code: 405,
    error: 'METHOD_NOT_ALLOWED',
    message: 'Method not allowed',
  };

  static NOT_ACCEPTABLE: CodeDescription = {
    code: 406,
    error: 'NOT_ACCEPTABLE',
    message: 'Not acceptable',
  };

  static PROXY_AUTHENTICATION_REQUIRED: CodeDescription = {
    code: 407,
    error: 'PROXY_AUTHENTICATION_REQUIRED',
    message: 'Proxy authentication required',
  };

  static REQUEST_TIMEOUT: CodeDescription = {
    code: 408,
    error: 'REQUEST_TIMEOUT',
    message: 'Request timeout',
  };

  static CONFLICT: CodeDescription = {
    code: 409,
    error: 'CONFLICT',
    message: 'Conflict',
  };

  static GONE: CodeDescription = { code: 410, error: 'GONE', message: 'Gone' };

  static LENGTH_REQUIRED: CodeDescription = {
    code: 411,
    error: 'LENGTH_REQUIRED',
    message: 'Length required',
  };

  static PRECONDITION_FAILED: CodeDescription = {
    code: 412,
    error: 'PRECONDITION_FAILED',
    message: 'Precondition failed',
  };

  static PAYLOAD_TOO_LARGE: CodeDescription = {
    code: 413,
    error: 'PAYLOAD_TOO_LARGE',
    message: 'Payload too large',
  };

  static URI_TOO_LONG: CodeDescription = {
    code: 414,
    error: 'URI_TOO_LONG',
    message: 'URI too long',
  };

  static UNSUPPORTED_MEDIA_TYPE: CodeDescription = {
    code: 415,
    error: 'UNSUPPORTED_MEDIA_TYPE',
    message: 'Unsupported media type',
  };

  static RANGE_NOT_SATISFIABLE: CodeDescription = {
    code: 416,
    error: 'RANGE_NOT_SATISFIABLE',
    message: 'Range not satisfiable',
  };

  static EXPECTATION_FAILED: CodeDescription = {
    code: 417,
    error: 'EXPECTATION_FAILED',
    message: 'Expectation failed',
  };

  static IM_TEAPOT: CodeDescription = {
    code: 418,
    error: 'IM_TEAPOT',
    message: 'Im a teapot',
  };

  static MISDIRECTED_REQUEST: CodeDescription = {
    code: 421,
    error: 'MISDIRECTED_REQUEST',
    message: 'Misdirected request',
  };

  static UNPROCESSABLE_ENTITY: CodeDescription = {
    code: 422,
    error: 'UNPROCESSABLE_ENTITY',
    message: 'Unprocessable entity',
  };

  static LOCKED_WEBDAV: CodeDescription = {
    code: 423,
    error: 'LOCKED_WEBDAV',
    message: 'Locked (WebDAV)',
  };

  static FAILED_DEPENDENCY_WEBDAV: CodeDescription = {
    code: 424,
    error: 'FAILED_DEPENDENCY_WEBDAV',
    message: 'Failed dependency (WebDAV)',
  };

  static TOO_EARLY_EXPERIMENTAL: CodeDescription = {
    code: 425,
    error: 'TOO_EARLY_EXPERIMENTAL',
    message: 'Too early experimental',
  };

  static UPGRADE_REQUIRED: CodeDescription = {
    code: 426,
    error: 'UPGRADE_REQUIRED',
    message: 'Upgrade required',
  };

  static PRECONDITION_REQUIRED: CodeDescription = {
    code: 428,
    error: 'PRECONDITION_REQUIRED',
    message: 'Precondition required',
  };

  static TOO_MANY_REQUESTS: CodeDescription = {
    code: 429,
    error: 'TOO_MANY_REQUESTS',
    message: 'Too Many requests',
  };

  static REQUEST_HEADER_FIELDS_TOO_LARGE: CodeDescription = {
    code: 431,
    error: 'REQUEST_HEADER_FIELDS_TOO_LARGE',
    message: 'Request header fields too large',
  };

  static UNAVAILABLE_FOR_LEGAL_REASONS: CodeDescription = {
    code: 451,
    error: 'UNAVAILABLE_FOR_LEGAL_REASONS',
    message: 'Unavailable for legal reasons',
  };

  // SERVER ERROR RESPONSE
  static INTERNAL_SERVER_ERROR: CodeDescription = {
    code: 500,
    error: 'INTERNAL_SERVER_ERROR',
    message: 'Internal server error',
  };

  static NOT_IMPLEMENTED: CodeDescription = {
    code: 501,
    error: 'NOT_IMPLEMENTED',
    message: 'Not implemented',
  };

  static BAD_GATEWAY: CodeDescription = {
    code: 502,
    error: 'BAD_GATEWAY',
    message: 'Bad Gateway',
  };

  static SERVICE_UNAVAILABLE: CodeDescription = {
    code: 503,
    error: 'SERVICE_UNAVAILABLE',
    message: 'Service unavailable',
  };

  static GATEWAY_TIMEOUT: CodeDescription = {
    code: 504,
    error: 'GATEWAY_TIMEOUT',
    message: 'Gateway timeout',
  };

  static HTTP_VERRSION_NOT_SUPPORTED: CodeDescription = {
    code: 505,
    error: 'HTTP_VERRSION_NOT_SUPPORTED',
    message: 'HTTP version not supported',
  };

  static VARIANT_ALSO_NEGOTIATES: CodeDescription = {
    code: 506,
    error: 'VARIANT_ALSO_NEGOTIATES',
    message: 'Variant also negotiates',
  };

  static INSUFFICIENT_STORAGE_WEBDAV: CodeDescription = {
    code: 507,
    error: 'INSUFFICIENT_STORAGE_WEBDAV',
    message: 'Insufficient storage (WebDAV)',
  };

  static LOOP_DETECTED_WEBDAV: CodeDescription = {
    code: 508,
    error: 'LOOP_DETECTED_WEBDAV',
    message: 'Loop detected (WebDAV)',
  };

  static NOT_EXTENDED: CodeDescription = {
    code: 510,
    error: 'NOT_EXTENDED',
    message: 'Not extended',
  };

  static NETWORK_AUTHENTICATION_REQUIRED: CodeDescription = {
    code: 511,
    error: 'NETWORK_AUTHENTICATION_REQUIRED',
    message: 'Network authentication required',
  };

  // INTERNAL

  static ENTITY_NOT_FOUND: CodeDescription = {
    code: 1000,
    error: 'ENTITY_NOT_FOUND',
    message: 'Entity not found',
  };

  static ENTITY_VALIDATION: CodeDescription = {
    code: 1001,
    error: 'ENTITY_VALIDATION',
    message: 'Entity validation error',
  };

  static USE_CASE_PORT_VALIDATION: CodeDescription = {
    code: 1002,
    error: 'USE_CASE_PORT_VALIDATION',
    message: 'Use-case port validation error',
  };

  static VALUE_OBJECT_VALIDATION: CodeDescription = {
    code: 1003,
    error: 'VALUE_OBJECT_VALIDATION',
    message: 'Value object validation error',
  };

  static ENTITY_ALREADY_EXISTS: CodeDescription = {
    code: 1004,
    error: 'ENTITY_ALREADY_EXISTS',
    message: 'Entity already exists',
  };
}
