import { BadRequestException, Injectable } from '@nestjs/common';
import Tenant from '@fireheet/entities/typeorm/Tenant';
import TenantsRepository from '../infra/typeorm/repositories/TenantsRepository';

@Injectable()
export default class ListTenantService {
  constructor(private readonly tenantsRepository: TenantsRepository) {}

  public async execute(id: string): Promise<Tenant> {
    const tenant = await this.tenantsRepository.findByID(id);

    if (!tenant) {
      throw new BadRequestException(`User with id "${id}" does not exists!`);
    }

    return tenant;
  }
}
