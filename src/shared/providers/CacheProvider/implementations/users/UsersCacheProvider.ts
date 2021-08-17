import { User } from '@fireheet/entities';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager-redis-store';
import ICacheProvider from '../../model/ICacheProvider';

@Injectable()
export default class UsersCacheProvider implements ICacheProvider {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  store<T>(key: string, data: T): void {
    this.cacheManager.set(`${key}-user`, data);
  }

  get<T>(key: string): T {
    const cachedUser = this.cacheManager.get<T>(`${key}-user`);

    delete cachedUser.password;
    delete cachedUser.document_number;
    delete cachedUser.role_id;

    return cachedUser;
  }

  delete(key: string): void {
    this.cacheManager.del(`${key}-user`);
  }
}
