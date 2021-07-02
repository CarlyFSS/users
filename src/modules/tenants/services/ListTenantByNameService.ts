import { BadRequestException, Injectable } from '@nestjs/common';
import Tenant from '@fireheet/entities/typeorm/Tenant';

import TenantsRepository from '../infra/typeorm/repositories/TenantsRepository';

@Injectable()
export default class ListTenantService {
  constructor(private readonly tenantsRepository: TenantsRepository) {}

  public async execute(name: string): Promise<Tenant> {
    const tenant = await this.tenantsRepository.findByName(name);

    if (!tenant) {
      throw new BadRequestException(
        `Tenant with name "${name}" does not exists!`,
      );
    }

    return tenant;
  }
}
