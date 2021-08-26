import { User } from '@fireheet/entities';
import { Injectable } from '@nestjs/common';
import RedisCacheProvider from '../../../../../shared/providers/CacheProvider/implementations/RedisCacheProvider';
import ICustomCacheProvider from '../../../../../shared/providers/CacheProvider/model/ICustomCacheProvider';

@Injectable()
export default class UsersCacheProvider implements ICustomCacheProvider<User> {
  constructor(private readonly redisCache: RedisCacheProvider<User>) {}

  async store(key: string, data: User): Promise<User> {
    await this.redisCache.store(`${key}-user`, data);

    return data;
  }

  async get(key: string): Promise<User> {
    const cachedUser = await this.redisCache.get(`${key}-user`);

    if (!cachedUser) {
      return undefined;
    }

    delete cachedUser.role_id;
    delete cachedUser.password;
    delete cachedUser.document_number;

    return cachedUser;
  }

  async delete(key: string): Promise<User> {
    const cachedUser = await this.redisCache.get(`${key}-user`);

    if (!cachedUser) {
      return undefined;
    }

    this.redisCache.delete(`${key}-user`);

    return cachedUser;
  }
}
