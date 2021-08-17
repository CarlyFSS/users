import { User } from '@fireheet/entities';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager-redis-store';
import ICacheProvider from '../../model/ICacheProvider';

@Injectable()
export default class UsersCacheProvider implements ICacheProvider {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async store(key: string, data: User): Promise<void> {
    await this.cacheManager.set(`${key}-user`, data);
  }

  async get<T>(key: string): Promise<T> {
    const cachedUser = await this.cacheManager.get<T>(`${key}-user`);

    delete cachedUser.password;
    delete cachedUser.document_number;
    delete cachedUser.role_id;

    return cachedUser;
  }

  async delete(key: string): Promise<void> {
    await this.cacheManager.del(`${key}-user`);
  }
}
