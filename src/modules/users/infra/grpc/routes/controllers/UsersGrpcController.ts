import { Controller, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager-redis-store';
import { GrpcMethod } from '@nestjs/microservices';
import { User } from '@fireheet/entities';
import ListUserService from '../../../../services/ListUserService';

@Controller()
export default class UsersGrpcController {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly listUser: ListUserService,
  ) {}

  @GrpcMethod()
  async list(id: string): Promise<Partial<User>> {
    let user: Partial<User>;
    const cachedUser = await this.cacheManager.get<User>(`${id}-user`);

    if (!cachedUser) {
      user = await this.listUser.execute(id);

      await this.cacheManager.set(`${id}-user`, user);

      return user;
    }

    return cachedUser;
  }
}
