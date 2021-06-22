import { BadRequestException, Injectable } from '@nestjs/common';
import Tenant from '@fireheet/entities/typeorm/Tenant';
import UpdateTenantDTO from '../dtos/UpdateTenantDTO';
import TenantsRepository from '../infra/typeorm/repositories/TenantsRepository';

@Injectable()
export default class UpdateTenantService {
  constructor(private readonly tenantsRepository: TenantsRepository) {}

  public async execute({ id, name }: UpdateTenantDTO): Promise<Tenant> {
    const tenant = await this.tenantsRepository.findByID(id);

    if (!tenant) {
      throw new BadRequestException(`User with ID "${id}" not found!`);
    }

    const checkName = await this.tenantsRepository.findByName(name);

    if (checkName) {
      throw new BadRequestException(`User with name "${name}" already exists!`);
    }

    tenant.name = name;

    await this.tenantsRepository.update(tenant);

    return tenant;
  }
}
