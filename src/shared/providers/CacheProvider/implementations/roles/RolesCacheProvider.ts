import { Role } from '@fireheet/entities';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager-redis-store';
import ICacheProvider from '../../model/ICacheProvider';

@Injectable()
export default class RolesCacheProvider implements ICacheProvider {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  store<T>(key: string, data: T): void {
    this.cacheManager.set(`${key}-role`, data);
  }

  storeMany<T>(data: T): void {
    this.cacheManager.set(`all-roles`, data);
  }

  get<T>(key: string): T {
    return this.cacheManager.get<T>(`${key}-role`);
  }

  delete(key: string): void {
    this.cacheManager.del(`${key}-role`);
  }
}
