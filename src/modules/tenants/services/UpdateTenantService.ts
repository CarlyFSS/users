import { BadRequestException, Injectable } from '@nestjs/common';
import Tenant from '@fireheet/entities/typeorm/Tenant';
import { EventEmitter2 } from '@nestjs/event-emitter';
import UpdateTenantDTO from '../dtos/UpdateTenantDTO';
import TenantsRepository from '../infra/typeorm/repositories/TenantsRepository';

@Injectable()
export default class UpdateTenantService {
  constructor(
    private readonly tenantsRepository: TenantsRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async execute({ id, name }: UpdateTenantDTO): Promise<Tenant> {
    const tenant = await this.tenantsRepository.findByID(id);

    if (!tenant) {
      throw new BadRequestException(`Tenant with ID "${id}" not found!`);
    }

    const checkName = await this.tenantsRepository.findByName(name);

    if (checkName) {
      throw new BadRequestException(
        `Tenant with name "${name}" already exists!`,
      );
    }

    tenant.name = name;

    await this.tenantsRepository.update(tenant);

    this.eventEmitter.emit('tenant.updated', tenant);

    return tenant;
  }
}
