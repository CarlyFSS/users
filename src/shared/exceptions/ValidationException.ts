import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  NotAcceptableException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { logError } from '@shared/utils/AppLogger';

@Catch(NotAcceptableException)
export default class ValidationException implements ExceptionFilter {
  catch(exception: NotAcceptableException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    logError('Exception', exception.message);

    const validationParse = JSON.stringify(exception.getResponse());
    const validationError = JSON.parse(validationParse);

    response.status(status);

    response.send({
      status_code: status,
      message: exception.message,
      path: request.url,
      validations: validationError.message,
      method: request.method,
      timestamp: new Date().toISOString(),
    });
  }
}
