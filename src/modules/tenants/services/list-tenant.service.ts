import { BadRequestException, Injectable } from '@nestjs/common';
import { log_verbose } from '../../../shared/helper/app-logger';
import Tenant from '../infra/typeorm/entities/tenant.entity';
import TenantsRepository from '../infra/typeorm/repositories/tenants.repository';

@Injectable()
export default class ListTenantService {
  constructor(private tenantsRepository: TenantsRepository) {}

  public async execute(id: string): Promise<Tenant> {
    const tenant = await this.tenantsRepository.findByID(id);

    if (!tenant)
      throw new BadRequestException(`User with id "${id}" does not exists!`);

    log_verbose('Tenants Controller', `SYSADMIN: Listed tenant ${tenant.name}`);

    return tenant;
  }
}
