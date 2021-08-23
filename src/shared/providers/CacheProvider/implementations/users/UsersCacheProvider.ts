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

  store<T>(key: string, data: T): T {
    this.cacheManager.set(`${key}-user`, data);

    return data;
  }

  async get<T>(key: string): Promise<T | any> {
    const cachedUser = await this.cacheManager.get<User>(`${key}-user`);

    if (!cachedUser) {
      return null;
    }

    const returnedUser: User = {
      id: cachedUser.id,
      document_number: cachedUser.document_number,
      password: cachedUser.password,
      role_id: cachedUser.role_id,
      name: cachedUser.name,
      email: cachedUser.email,
      main_address_id: cachedUser.main_address_id,
      sex: cachedUser.sex,
      birthdate: cachedUser.birthdate,
      created_at: cachedUser.created_at,
      updated_at: cachedUser.updated_at,
      deleted_at: cachedUser.deleted_at,
    };

    delete returnedUser.password;
    delete returnedUser.document_number;
    delete returnedUser.role_id;

    return returnedUser;
  }

  delete<T>(key: string): T {
    const cachedUser = this.cacheManager.get<T>(`${key}-user`);

    this.cacheManager.del(`${key}-user`);

    return cachedUser;
  }
}
