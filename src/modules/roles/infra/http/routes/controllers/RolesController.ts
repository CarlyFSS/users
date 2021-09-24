import { Role } from '@fireheet/entities/typeorm/users';
import {
  Controller,
  Param,
  UseFilters,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ErrorException from '../../../../../../shared/exceptions/ErrorException';
import PaginationInterceptor from '../../../../../../shared/infra/http/interceptor/PaginationInterceptor';
import UUIDValidationInterceptor from '../../../../../../shared/infra/http/interceptor/UUIDValidationInterceptor';
import RolesCacheVerifierService from '../../../../services/RolesCacheVerifierService';

@ApiTags('Roles Routes')
@Controller('roles')
@UseFilters(ErrorException)
export default class RolesController {
  constructor(private readonly rolesCacheVerifier: RolesCacheVerifierService) {}

  @Get()
  @UseInterceptors(PaginationInterceptor)
  async index(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ): Promise<Role | Role[]> {
    return this.rolesCacheVerifier.execute(undefined, offset, limit);
  }

  @Get(':role_id')
  @UseInterceptors(UUIDValidationInterceptor)
  async show(@Param('role_id') role_id: string): Promise<Role | Role[]> {
    return this.rolesCacheVerifier.execute(role_id);
  }
}
