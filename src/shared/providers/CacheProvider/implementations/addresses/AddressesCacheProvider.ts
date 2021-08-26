import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager-redis-store';
import ICacheProvider from '../../model/ICacheProvider';

@Injectable()
export default class AddressesCacheProvider implements ICacheProvider {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async store<T>(key: string, data: T): Promise<T> {
    return this.cacheManager.set(`${key}-address`, data);
  }

  storeMany<T>(data: T, key?: string): void {
    this.cacheManager.set(`user-${key}-addresses`, data);
  }

  /**
   * @param key *address_id* | *user_id*
   * @param all if *true*, pass the key as the user_id to return all user addresses
   */
  async get<T>(key: string, all?: boolean): Promise<T | any> {
    if (all) {
      const cachedAddresses = await this.cacheManager.get<T>(
        `user-${key}-addresses`,
      );

      return cachedAddresses;
    }

    const cachedAddress = await this.cacheManager.get<T>(`${key}-address`);

    return cachedAddress;
  }

  /**
   * @param key *address_id* | *user_id*
   * @param all if *true*, pass the key as the user_id to return all user addresses
   */
  delete<T>(key: string, all?: boolean): T {
    if (all) {
      const cachedAddresses = this.cacheManager.get<T>(`user-${key}-address`);

      this.cacheManager.del(`user-${key}-addresses`);

      return cachedAddresses;
    }

    const cachedAddress = this.cacheManager.get<T>(`${key}-address`);

    this.cacheManager.del(`${key}-address`);

    return cachedAddress;
  }
}
