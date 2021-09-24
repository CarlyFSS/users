import { Role } from '@fireheet/entities/typeorm/users';
import { Injectable } from '@nestjs/common';
import RedisCacheProvider from '../../../../../shared/providers/CacheProvider/implementations/RedisCacheProvider';
import ICustomCacheProvider from '../../../../../shared/providers/CacheProvider/model/ICustomCacheProvider';

@Injectable()
export default class RolesCacheProvider
  implements ICustomCacheProvider<Role | Role[]>
{
  constructor(private readonly redisCache: RedisCacheProvider<Role | Role[]>) {}

  async store(key: string, data: Role): Promise<Role> {
    await this.redisCache.store(`${key}-role`, data);

    return data;
  }

  async storeMany(data: Role[], key?: string): Promise<Role[]> {
    const searchKey = key || 'all-roles-offset1-limit5';

    await this.redisCache.store(searchKey, data);

    return data;
  }

  async get(key: string): Promise<Role | Role[]> {
    let cachedRoles: Role | Role[];

    if (!key) {
      cachedRoles = await this.redisCache.get(`all-roles`);

      return cachedRoles;
    }

    cachedRoles = await this.redisCache.get(`${key}-role`);

    return cachedRoles;
  }

  async delete(key: string): Promise<Role | Role[]> {
    const cachedRoles = await this.redisCache.get(`${key}-role`);

    this.redisCache.delete(`${key}-role`);

    return cachedRoles;
  }
}
