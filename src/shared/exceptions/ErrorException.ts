import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import httpLog from '@config/log.config';
import { logError } from '@shared/utils/AppLogger';

@Catch(HttpException)
export default class ErrorException implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    logError('Exception', exception.message);

    httpLog.post('/', {
      message: exception.message,
      status_code: status,
      stack: exception.stack,
    });

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
