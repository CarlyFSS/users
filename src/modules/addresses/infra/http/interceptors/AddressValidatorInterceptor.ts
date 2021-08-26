import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export default class AddressValidatorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { body } = context.switchToHttp().getRequest();

    const addressNumber = body.number;

    if (addressNumber > 32000 || addressNumber < 0) {
      throw new BadRequestException(
        'Address number must be between 0 and 32000',
      );
    }
    return next.handle();
  }
}
