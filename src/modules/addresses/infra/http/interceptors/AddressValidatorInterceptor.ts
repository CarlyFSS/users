import { Address } from '@fireheet/entities/typeorm/users';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

const ADDRESS_NUMBER_MAX_VALUE = 32000;

@Injectable()
export default class AddressValidatorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Address> {
    const { body } = context.switchToHttp().getRequest();

    const addressNumber = body.number;

    if (addressNumber > ADDRESS_NUMBER_MAX_VALUE || addressNumber < 0) {
      throw new BadRequestException(
        'Address number must be between 0 and 32000',
      );
    }

    return next.handle();
  }
}
