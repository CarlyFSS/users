import CreateTenantDTO from '@modules/tenants/dtos/create-tenant.dto';
import { AbstractRepository, EntityRepository, getRepository } from 'typeorm';
import ITenantsRepository from '../../../repositories/i-tenants.repository';
import Tenant from '../entities/tenant.entity';

@EntityRepository(Tenant)
export default class TenantsRepository
  extends AbstractRepository<Tenant>
  implements ITenantsRepository {
  private ormRepository = getRepository(Tenant);

  public async create(data: CreateTenantDTO): Promise<Tenant> {
    const tenant = this.ormRepository.create(data);

    return this.ormRepository.save(tenant);
  }

  public async update(tenant: Tenant): Promise<Tenant> {
    return this.ormRepository.save(tenant);
  }

  public async findByName(name: string): Promise<Tenant | undefined> {
    return this.ormRepository.findOne({ where: { name } });
  }

  public async findByID(id: string): Promise<Tenant | undefined> {
    return this.ormRepository.findOne({ where: { id } });
  }
}
