import UpdateTenantService from '@modules/tenants/services/UpdateTenantService';
import {
  Body,
  Controller,
  Patch,
  Post,
  Param,
  UseFilters,
  Get,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ErrorException from '@shared/exceptions/ErrorException';
import ListTenantService from '@modules/tenants/services/ListTenantService';
import Tenant from '@fireheet/entities/typeorm/Tenant';
import { Cache } from 'cache-manager-redis-store';

@ApiTags('Tenants Routes')
@Controller('tenants')
@UseFilters(ErrorException)
export default class TenantsController {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly updateTenant: UpdateTenantService,
    private readonly listTenant: ListTenantService,
  ) {}

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body('name') name: string,
  ): Promise<Tenant> {
    const tenant = await this.updateTenant.execute({ id, name });

    return tenant;
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<Tenant> {
    let tenant: Tenant;
    const cachedTenant = await this.cacheManager.get<Tenant>(`${id}-tenant`);

    if (!cachedTenant) {
      tenant = await this.listTenant.execute(id);

      await this.cacheManager.set(`${id}-tenant`, tenant);

      return tenant;
    }

    return cachedTenant;
  }
}
