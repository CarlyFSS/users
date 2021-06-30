import CreateTenantDTO from '@modules/tenants/dtos/CreateTenantDTO';
import CreateTenantService from '@modules/tenants/services/CreateTenantService';
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
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cache } from 'cache-manager-redis-store';

@ApiTags('Tenants Routes')
@Controller('tenants')
@UseFilters(ErrorException)
export default class TenantsController {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly createTenant: CreateTenantService,
    private readonly updateTenant: UpdateTenantService,
    private readonly listTenant: ListTenantService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Post()
  async create(@Body() data: CreateTenantDTO): Promise<Tenant> {
    const tenant = await this.createTenant.execute(data);

    this.eventEmitter.emit('tenant.created', tenant);

    return tenant;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body('name') name: string,
  ): Promise<Tenant> {
    const tenant = await this.updateTenant.execute({ id, name });

    this.eventEmitter.emit('tenant.updated', tenant);

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
