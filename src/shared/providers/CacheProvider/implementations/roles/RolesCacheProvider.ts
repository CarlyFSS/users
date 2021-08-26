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

  store<T>(key: string, data: T): T {
    this.cacheManager.set(`${key}-role`, data);

    return data;
  }

  storeMany<T>(data: T): void {
    this.cacheManager.set(`all-roles`, data);
  }

  async get<T>(key: string): Promise<T | any> {
    const cachedRole = this.cacheManager.get<T>(`${key}-role`);

    if (!cachedRole) {
      return null;
    }

    const returnedRole: Role = {
      id: cachedRole.id,
      name: cachedRole.name,
      created_at: cachedRole.created_at,
      updated_at: cachedRole.updated_at,
    };

    return returnedRole;
  }

  delete<T>(key: string): T {
    const cachedRole = this.cacheManager.get<T>(`${key}-role`);

    this.cacheManager.del(`${key}-role`);

    return cachedRole;
  }
}
