import CreateTenantDTO from '@modules/tenants/dtos/CreateTenantDTO';
import { AbstractRepository, EntityRepository, getRepository } from 'typeorm';
import Tenant from '@fireheet/entities/typeorm/Tenant';
import ITenantsRepository from '../../../repositories/ITenantsRepository';

@EntityRepository(Tenant)
export default class TenantsRepository
  extends AbstractRepository<Tenant>
  implements ITenantsRepository
{
  private readonly ormRepository = getRepository(Tenant);

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
