import { Controller, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Role } from '@fireheet/entities';
import { Cache } from 'cache-manager-redis-store';
import { GrpcMethod } from '@nestjs/microservices';
import ListRoleService from '../../../../services/ListRoleService';
import ListAllRolesService from '../../../../services/ListAllRolesService';

@Controller()
export default class RolesGrpcController {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly listRole: ListRoleService,
    private readonly listAllRoles: ListAllRolesService,
  ) {}

  @GrpcMethod()
  async list(id: string): Promise<Role> {
    let role: Role;
    const cachedRole = await this.cacheManager.get<Role>(`${id}-role`);

    if (!cachedRole) {
      role = await this.listRole.execute(id);

      await this.cacheManager.set(`${id}-role`, role);

      return role;
    }

    return cachedRole;
  }

  @GrpcMethod()
  async listAll(): Promise<Role[]> {
    let roles: Role[];
    const cachedRoles = await this.cacheManager.get<Role[]>(`all-roles`);

    if (!cachedRoles) {
      roles = await this.listAllRoles.execute();

      await this.cacheManager.set(`all-roles`, roles);

      return roles;
    }

    return cachedRoles;
  }
}
