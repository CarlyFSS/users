import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import ICacheProvider from '../model/ICacheProvider';

@Injectable()
export default class RedisCacheProvider<T> implements ICacheProvider<T> {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async store(key: string, data: T): Promise<T | undefined> {
    await this.cacheManager.set<T>(key, data);

    return data;
  }

  async get(key: string): Promise<T | undefined> {
    return this.cacheManager.get<T>(key);
  }

  async delete(key: string): Promise<T | undefined> {
    const data = await this.get(key);

    await this.cacheManager.del(key);

    return data;
  }
}
