import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  PAGINATION_LIMIT,
  PAGINATION_LIMIT_MAX,
  PAGINATION_OFFSET,
  PAGINATION_OFFSET_MAX,
} from '../../../config/DefaultValues';

interface PaginationQuery {
  offset?: number;
  limit?: number;
}

@Injectable()
export default class PaginationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
    const { query } = context.switchToHttp().getRequest();

    this.validateQuery(query);

    return next.handle();
  }

  validateQuery(query: PaginationQuery): void {
    const offset = query?.offset || PAGINATION_OFFSET;
    const limit = query?.limit || PAGINATION_LIMIT;

    if (!Number.isInteger(offset) && !Number.isInteger(limit)) {
      throw new BadRequestException();
    }

    if (+limit < 0 && +limit > PAGINATION_LIMIT_MAX) {
      throw new BadRequestException(
        `The limit must be between 1 and ${PAGINATION_LIMIT_MAX}`,
      );
    }

    if (+offset < 0 && +offset > PAGINATION_OFFSET_MAX) {
      throw new BadRequestException(
        `The offset must be between 0 and ${PAGINATION_OFFSET_MAX}`,
      );
    }
  }
}
