// import {
//   ExceptionFilter,
//   Catch,
//   ArgumentsHost,
//   HttpException,
// } from '@nestjs/common';
// import { Response } from 'express';

// @Catch(Error)
// export class ErrorFilter implements ExceptionFilter<Error> {
//   catch(exception: Error, host: ArgumentsHost) {
//     const error = JSON.parse(JSON.stringify(exception));
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();

//     let json = {
//       statusCode: 500,
//       error: exception.message,
//       message: exception.message,
//       details: [error],
//     };

//     if (exception instanceof HttpException) {
//       json = Object.assign(json, exception.getResponse());
//     }
//     response.status(500).json(json);
//   }
// }
