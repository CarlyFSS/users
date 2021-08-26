import { Role } from '@fireheet/entities';
import { Controller, Param, UseFilters, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ErrorException from '../../../../../../shared/exceptions/ErrorException';
import RolesCacheProvider from '../../../../../../shared/providers/CacheProvider/implementations/roles/RolesCacheProvider';
import ListAllRolesService from '../../../../services/ListAllRolesService';
import ListRoleService from '../../../../services/ListRoleService';

@ApiTags('Roles Routes')
@Controller('roles')
@UseFilters(ErrorException)
export default class RolesController {
  constructor(
    private readonly rolesCache: RolesCacheProvider,
    private readonly listRole: ListRoleService,
    private readonly listAllRoles: ListAllRolesService,
  ) {}

  @Get()
  async index(): Promise<Role[]> {
    let roles: Role[];

    const cachedRoles = this.rolesCache.get<Role[]>(`all-roles`);

    if (!cachedRoles) {
      roles = await this.listAllRoles.execute();

      this.rolesCache.storeMany(roles);

      return roles;
    }

    return cachedRoles;
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<Role> {
    let role: Role;

    const cachedRole = this.rolesCache.get<Role>(`${id}-role`);

    if (!cachedRole) {
      role = await this.listRole.execute(id);

      this.rolesCache.store(id, role);

      return role;
    }

    return cachedRole;
  }
}
