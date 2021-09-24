import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

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
    const offset = query?.offset || 0;
    const limit = query?.limit || 5;

    if (!Number.isInteger(offset) && !Number.isInteger(limit)) {
      throw new BadRequestException();
    }

    if (+limit < 0 && +limit > 100) {
      throw new BadRequestException('The limit must be between 1 and 100');
    }

    if (+offset < 0 && +offset > 2147483600) {
      throw new BadRequestException(
        'The offset must be between 0 and 2147483600',
      );
    }
  }
}
