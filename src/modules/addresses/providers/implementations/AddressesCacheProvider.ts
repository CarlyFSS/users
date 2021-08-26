import { Address } from '@fireheet/entities';
import { Injectable } from '@nestjs/common';
import RedisCacheProvider from '../../../../shared/providers/CacheProvider/implementations/RedisCacheProvider';
import ICustomCacheProvider from '../../../../shared/providers/CacheProvider/model/ICustomCacheProvider';

@Injectable()
export default class AddressesCacheProvider
  implements ICustomCacheProvider<Address | Address[]>
{
  constructor(
    private readonly redisCache: RedisCacheProvider<Address | Address[]>,
  ) {}

  async store(key: string, data: Address): Promise<Address> {
    await this.redisCache.store(`${key}-address`, data);

    return data;
  }

  async storeMany(key?: string, data?: Address[]): Promise<Address[]> {
    await this.redisCache.store(`user-${key}-addresses`, data);

    return data;
  }

  /**
   * @param key *address_id* | *user_id*
   * @param all if *true*, pass the key as the user_id to return all user addresses
   */
  async get(key: string, all?: boolean): Promise<Address | Address[]> {
    if (all) {
      const cachedAddresses = await this.redisCache.get(
        `user-${key}-addresses`,
      );

      if (!cachedAddresses) {
        return undefined;
      }

      return cachedAddresses;
    }

    const cachedAddress = await this.redisCache.get(`${key}-address`);

    if (!cachedAddress) {
      return undefined;
    }

    return cachedAddress;
  }

  /**
   * @param key *address_id* | *user_id*
   * @param all if *true*, pass the key as the user_id to delete all user addresses
   */
  async delete(key: string, all?: boolean): Promise<Address | Address[]> {
    if (all) {
      const cachedAddresses = this.redisCache.get(`user-${key}-address`);

      if (!cachedAddresses) {
        return undefined;
      }

      await this.redisCache.delete(`user-${key}-addresses`);

      return cachedAddresses;
    }

    const cachedAddress = this.redisCache.get(`${key}-address`);

    if (!cachedAddress) {
      return undefined;
    }

    await this.redisCache.delete(`${key}-address`);

    return cachedAddress;
  }
}
