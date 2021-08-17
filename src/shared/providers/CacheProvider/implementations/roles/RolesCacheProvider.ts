import { User, Role } from '@fireheet/entities';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager-redis-store';
import ICacheProvider from '../../model/ICacheProvider';

@Injectable()
export default class RolesCacheProvider implements ICacheProvider {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async store(key: string, data: Role): Promise<void> {
    await this.cacheManager.set(`${key}-role`, data);
  }

  async storeMany(data: Role[]): Promise<void> {
    await this.cacheManager.set(`all-roles`, data);
  }

  async get<T>(key: string): Promise<T> {
    const cachedRole = await this.cacheManager.get<T>(`${key}-role`);

    return cachedRole;
  }

  async delete(key: string): Promise<void> {
    await this.cacheManager.del(`${key}-role`);
  }
}
