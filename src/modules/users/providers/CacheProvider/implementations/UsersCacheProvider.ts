import { User } from '@fireheet/entities/typeorm/users';
import { Injectable } from '@nestjs/common';
import RedisCacheProvider from '../../../../../shared/providers/CacheProvider/implementations/RedisCacheProvider';
import ICustomCacheProvider from '../../../../../shared/providers/CacheProvider/model/ICustomCacheProvider';

@Injectable()
export default class UsersCacheProvider
  implements ICustomCacheProvider<Partial<User>>
{
  constructor(private readonly redisCache: RedisCacheProvider<Partial<User>>) {}

  async store(key: string, data: Partial<User>): Promise<Partial<User>> {
    await this.redisCache.store(`${key}-user`, data);

    return data;
  }

  async get(key: string): Promise<Partial<User> | undefined> {
    const cachedUser = await this.redisCache.get(`${key}-user`);

    if (!cachedUser) {
      return undefined;
    }

    return cachedUser;
  }

  async delete(key: string): Promise<Partial<User> | undefined> {
    const cachedUser = await this.redisCache.get(`${key}-user`);

    if (!cachedUser) {
      return undefined;
    }

    this.redisCache.delete(`${key}-user`);

    return cachedUser;
  }
}
