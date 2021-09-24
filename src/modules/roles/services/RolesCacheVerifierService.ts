import { Injectable } from '@nestjs/common';
import { Role } from '@fireheet/entities/typeorm/users';
import RolesCacheProvider from '../providers/CacheProvider/implementations/RolesCacheProvider';
import ListRoleService from './ListRoleService';
import ListAllRolesService from './ListAllRolesService';

@Injectable()
export default class RolesCacheVerifierService {
  constructor(
    private readonly rolesCache: RolesCacheProvider,
    private readonly listRole: ListRoleService,
    private readonly listAllRoles: ListAllRolesService,
  ) {}

  /**
   * If *role_id* is *undefined*, it fetches all roles
   */
  public async execute(
    role_id?: string,
    offset?: number,
    limit?: number,
  ): Promise<Role | Role[]> {
    if (role_id) {
      const cached = await this.rolesCache.get(`${role_id}-role`);

      if (!cached) {
        const role = await this.listRole.execute(role_id);

        this.rolesCache.store(role_id, role);

        return role;
      }

      return cached;
    }

    const cachedMany = await this.rolesCache.get(
      `all-roles-offset${offset}-limit${limit}`,
    );

    if (!cachedMany) {
      const roles = await this.listAllRoles.execute(offset, limit);

      this.rolesCache.storeMany(
        roles,
        `all-roles-offset${offset}-limit${limit}`,
      );

      return roles;
    }

    return cachedMany;
  }
}
