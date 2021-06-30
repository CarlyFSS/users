import { BadRequestException, Injectable } from '@nestjs/common';
import Tenant from '@fireheet/entities/typeorm/Tenant';
import CreateTenantDTO from '../dtos/CreateTenantDTO';
import TenantsRepository from '../infra/typeorm/repositories/TenantsRepository';

@Injectable()
export default class CreateTenantService {
  constructor(private readonly tenantsRepository: TenantsRepository) {}

  public async execute({ name }: CreateTenantDTO): Promise<Tenant> {
    const tenantExists = await this.tenantsRepository.findByName(name);

    if (tenantExists) {
      throw new BadRequestException(
        `Tenant with name "${name}" already exists!`,
      );
    }

    return this.tenantsRepository.create({ name });
  }
}
