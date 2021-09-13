import { Role } from '@fireheet/entities';
import { Controller, Param, UseFilters, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ErrorException from '../../../../../../shared/exceptions/ErrorException';
import RolesCacheVerifierService from '../../../../services/RolesCacheVerifierService';

@ApiTags('Roles Routes')
@Controller('roles')
@UseFilters(ErrorException)
export default class RolesController {
  constructor(private readonly rolesCacheVerifier: RolesCacheVerifierService) {}

  @Get()
  async index(): Promise<Role | Role[]> {
    return this.rolesCacheVerifier.execute();
  }

  @Get(':role_id')
  async show(@Param('role_id') role_id: string): Promise<Role | Role[]> {
    return this.rolesCacheVerifier.execute(role_id);
  }
}
