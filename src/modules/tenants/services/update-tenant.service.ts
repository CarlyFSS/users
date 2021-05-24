import { BadRequestException, Injectable } from '@nestjs/common';
import { log_verbose } from '../../../shared/helper/app-logger';
import UpdateTenantDTO from '../dtos/update-tenant.dto';
import Tenant from '../infra/typeorm/entities/tenant.entity';
import TenantsRepository from '../infra/typeorm/repositories/tenants.repository';

@Injectable()
export default class UpdateTenantService {
  constructor(private tenantsRepository: TenantsRepository) {}

  public async execute({ id, name }: UpdateTenantDTO): Promise<Tenant> {
    const tenant = await this.tenantsRepository.findByID(id);

    if (!tenant)
      throw new BadRequestException(`User with ID "${id}" not found!`);

    const checkName = await this.tenantsRepository.findByName(name);

    if (checkName)
      throw new BadRequestException(`User with name "${name}" alredy exists!`);

    tenant.name = name;

    await this.tenantsRepository.update(tenant);

    log_verbose(
      'Tenants Controller',
      `SYSADMIN: Updated tenant to ${JSON.stringify({
        name,
      })}`,
    );

    return tenant;
  }
}
