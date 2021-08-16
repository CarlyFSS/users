import { Role } from '@fireheet/entities';
import {
  Controller,
  Param,
  UseFilters,
  Get,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ErrorException from '@shared/exceptions/ErrorException';
import { Cache } from 'cache-manager-redis-store';
import ListAllRolesService from '../../../../services/ListAllRolesService';
import ListRoleService from '../../../../services/ListRoleService';

@ApiTags('Roles Routes')
@Controller('roles')
@UseFilters(ErrorException)
export default class RolesController {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly listRole: ListRoleService,
    private readonly listAllRoles: ListAllRolesService,
  ) {}

  @Get()
  async index(): Promise<Role[]> {
    let roles: Role[];
    const cachedRoles = await this.cacheManager.get<Role[]>(`all-roles`);

    if (!cachedRoles) {
      roles = await this.listAllRoles.execute();

      await this.cacheManager.set(`all-roles`, roles);

      return roles;
    }

    return cachedRoles;
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<Role> {
    let role: Role;
    const cachedTenant = await this.cacheManager.get<Role>(`${id}-role`);

    if (!cachedTenant) {
      role = await this.listRole.execute(id);

      await this.cacheManager.set(`${id}-role`, role);

      return role;
    }

    return cachedTenant;
  }
}
