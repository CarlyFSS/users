import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { validate } from 'uuid';

interface IDParam {
  user_id?: string;
  phone_id?: string;
  address_id?: string;
}

@Injectable()
export default class UUIDValidationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
    const { params, query } = context.switchToHttp().getRequest();

    this.validateParams(params);

    this.validateQuery(query);

    return next.handle();
  }

  validateParams(params: IDParam): void {
    const userParam = params.user_id;
    const phoneParam = params.phone_id;
    const addressParam = params.address_id;

    if (userParam && !validate(userParam)) {
      throw new BadRequestException(
        `user_id: "${userParam}" on query is not a valid UUID`,
      );
    }

    if (phoneParam && !validate(phoneParam)) {
      throw new BadRequestException(
        `phone_id: "${phoneParam}" on query is not a valid UUID`,
      );
    }

    if (addressParam && !validate(addressParam)) {
      throw new BadRequestException(
        `address_id: "${addressParam}" on query is not a valid UUID`,
      );
    }
  }

  validateQuery(query: IDParam): void {
    const userQuery = query.user_id;
    const phoneQuery = query.phone_id;
    const addressQuery = query.address_id;

    if (userQuery && !validate(userQuery)) {
      throw new BadRequestException(
        `user_id: "${userQuery}" on query is not a valid UUID`,
      );
    }

    if (phoneQuery && !validate(phoneQuery)) {
      throw new BadRequestException(
        `phone_id: "${phoneQuery}" on query is not a valid UUID`,
      );
    }

    if (addressQuery && !validate(addressQuery)) {
      throw new BadRequestException(
        `address_id: "${addressQuery}" on query is not a valid UUID`,
      );
    }
  }
}
