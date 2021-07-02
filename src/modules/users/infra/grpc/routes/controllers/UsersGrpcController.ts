import { Controller, CACHE_MANAGER, Inject } from '@nestjs/common';
import Tenant from '@fireheet/entities/typeorm/Tenant';
import { Cache } from 'cache-manager-redis-store';
import { GrpcMethod } from '@nestjs/microservices';
import User from '@fireheet/entities/typeorm/User';
import ListUserService from '../../../../services/ListUserService';

@Controller()
export default class TenantsGrpcController {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly listUser: ListUserService,
  ) {}

  @GrpcMethod()
  async list(id: string): Promise<Tenant> {
    let user: User;
    const cachedUser = await this.cacheManager.get<User>(`${id}-tenant`);

    if (!cachedUser) {
      user = await this.listUser.execute(id);

      await this.cacheManager.set(`${id}-tenant`, user);

      return user;
    }

    return cachedUser;
  }
}
