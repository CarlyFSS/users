import { Injectable } from '@nestjs/common';
import { User } from '@fireheet/entities/typeorm/users';
import ListUserService from './ListUserService';
import UsersCacheProvider from '../providers/CacheProvider/implementations/UsersCacheProvider';

@Injectable()
export default class UsersCacheVerifierService {
  constructor(
    private readonly userCache: UsersCacheProvider,
    private readonly listUser: ListUserService,
  ) {}

  public async execute(id: string): Promise<Partial<User> | undefined> {
    let user: Partial<User> | undefined;

    user = await this.userCache.get(id);

    if (!user) {
      user = await this.listUser.execute(id);

      return this.userCache.store(id, user);
    }

    user = await this.listUser.execute(id);

    return user;
  }
}
