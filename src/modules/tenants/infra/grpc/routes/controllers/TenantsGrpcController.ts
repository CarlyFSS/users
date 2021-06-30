import CreateTenantDTO from '@modules/tenants/dtos/CreateTenantDTO';
import CreateTenantService from '@modules/tenants/services/CreateTenantService';
import { Controller, UseFilters, CACHE_MANAGER, Inject } from '@nestjs/common';
import ErrorException from '@shared/exceptions/ErrorException';
import Tenant from '@fireheet/entities/typeorm/Tenant';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cache } from 'cache-manager-redis-store';
import { GrpcMethod } from '@nestjs/microservices';
import ListTenantService from '../../../../services/ListTenantService';

@Controller()
export default class TenantsGrpcController {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly createTenant: CreateTenantService,
    private readonly listTenant: ListTenantService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @GrpcMethod()
  async list(id: string): Promise<Tenant> {
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
