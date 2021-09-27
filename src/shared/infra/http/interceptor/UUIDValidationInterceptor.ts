import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as uuid from 'uuid';

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
    const allParams = [params?.user_id, params?.address_id, params?.user_id];

    allParams.forEach(param => {
      if (param && !uuid.validate(param)) {
        throw new BadRequestException(
          `string "${param}" on params is not a valid UUID`,
        );
      }
    });
  }

  validateQuery(queries: IDParam): void {
    const allQueries = [queries.user_id, queries.address_id, queries.user_id];

    allQueries.forEach(query => {
      if (query && !uuid.validate(query)) {
        throw new BadRequestException(
          `string "${query}" on query is not a valid UUID`,
        );
      }
    });
  }
}
