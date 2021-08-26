import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager-redis-store';
import ICacheProvider from '../model/ICacheProvider';

@Injectable()
export default class RedisCacheProvider<T> implements ICacheProvider<T> {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async store(key: string, data: T): Promise<T> {
    await this.cacheManager.set<T>(key, data);

    return data;
  }

  async get(key: string): Promise<T> {
    return this.cacheManager.get<T>(key);
  }

  async delete(key: string): Promise<T> {
    const data = await this.get(key);

    await this.cacheManager.del(key);

    return data;
  }
}
