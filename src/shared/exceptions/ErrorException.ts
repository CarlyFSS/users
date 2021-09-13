import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { logError } from '../utils/AppLogger';

@Catch(HttpException)
export default class ErrorException implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    logError('Exception', exception.message);

    // Sends the error to elastic search
    // httpLog.post('/', {
    //   message: exception.message,
    //   status_code: status,
    //   timestamp: new Date().toISOString(),
    //   stack: exception.stack,
    // });

    response.status(status);

    response.send({
      status_code: status,
      message: exception.message,
      path: request.url,
      method: request.method,
      timestamp: new Date().toISOString(),
    });
  }
}
