import { Address } from '@fireheet/entities/typeorm/users';
import { Injectable } from '@nestjs/common';
import RedisCacheProvider from '../../../../shared/providers/CacheProvider/implementations/RedisCacheProvider';
import ICustomCacheProvider from '../../../../shared/providers/CacheProvider/model/ICustomCacheProvider';
import AddressesCacheKeysFactory from '../../factories/utils/AddressesCacheKeysFactory';

const { createKey } = AddressesCacheKeysFactory();

@Injectable()
export default class AddressesCacheProvider
  implements ICustomCacheProvider<Partial<Address> | Partial<Address>[]>
{
  constructor(
    private readonly redisCache: RedisCacheProvider<
      Partial<Address> | Partial<Address>[]
    >,
  ) {}

  async store(key: string, data: Partial<Address>): Promise<Partial<Address>> {
    await this.redisCache.store(createKey(key), data);

    return data;
  }

  async storeMany(
    data: Partial<Address>[],
    key: string,
    offset?: number,
    limit?: number,
  ): Promise<Partial<Address>[]> {
    await this.redisCache.store(createKey(key, offset, limit), data);

    return data;
  }

  /**
   * @param key *address_id* | *user_id*
   * @param all if *true*, pass the key as the user_id to return all user addresses
   */
  async get(
    key: string,
    all = false,
  ): Promise<Partial<Address> | Partial<Address>[] | undefined> {
    if (all) {
      return this.redisCache.get(key) || undefined;
    }

    return this.redisCache.get(createKey(key)) || undefined;
  }

  /**
   * @param key *address_id* | *user_id*
   * @param all if *true*, pass the key as the user_id to delete all user addresses
   */
  async delete(
    key: string,
    offset?: number,
    limit?: number,
    all?: boolean,
  ): Promise<Partial<Address> | Partial<Address>[] | undefined> {
    if (offset || limit || all) {
      return this.redisCache.delete(createKey(key, offset, limit)) || undefined;
    }

    return this.redisCache.delete(createKey(key)) || undefined;
  }
}
