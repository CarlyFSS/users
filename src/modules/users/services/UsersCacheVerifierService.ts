import { Injectable } from '@nestjs/common';
import { User } from '@fireheet/entities';
import UsersCacheProvider from '../../../shared/providers/CacheProvider/implementations/users/UsersCacheProvider';
import ListUserService from './ListUserService';

@Injectable()
export default class UserCacheVerifierService {
  constructor(
    private readonly userCache: UsersCacheProvider,
    private readonly listUser: ListUserService,
  ) {}

  public async execute(id: string): Promise<User> {
    let user: User;

    user = await this.userCache.get(id);

    if (!user) {
      user = await this.listUser.execute(id);

      this.userCache.store(id, user);

      return user;
    }

    return user;
  }
}
