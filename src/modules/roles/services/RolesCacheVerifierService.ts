import { Injectable } from '@nestjs/common';
import { Role } from '@fireheet/entities';
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
  public async execute(role_id?: string): Promise<Role | Role[]> {
    let roles: Role | Role[];

    if (!role_id) {
      roles = await this.rolesCache.get('all-roles');

      if (!roles) {
        roles = await this.listAllRoles.execute();

        this.rolesCache.storeMany(undefined, roles);

        return roles;
      }
    }

    roles = await this.rolesCache.get(`${role_id}-role`);

    if (!roles) {
      roles = await this.listRole.execute(role_id);

      this.rolesCache.store(role_id, roles);

      return roles;
    }

    return roles;
  }
}
