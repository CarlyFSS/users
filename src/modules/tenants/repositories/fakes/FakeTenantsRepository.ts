import CreateTenantDTO from '@modules/tenants/dtos/CreateTenantDTO';
import Tenant from '@fireheet/entities/typeorm/Tenant';
import faker from 'faker';
import ITenantsRepository from '../ITenantsRepository';

export default class FakeTenantsRepository implements ITenantsRepository {
  private tenants: Tenant[] = [];

  public async create({ name }: CreateTenantDTO): Promise<Tenant> {
    const tenant: Tenant = {
      name,
      id: faker.datatype.uuid(),
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.tenants.push(tenant);

    return tenant;
  }

  public async update(tenant: Tenant): Promise<Tenant> {
    const tenantIdx = this.tenants.indexOf(tenant);

    this.tenants[tenantIdx] = tenant;

    return this.tenants[tenantIdx];
  }

  public async findByName(name: string): Promise<Tenant | undefined> {
    return this.tenants.find(tenant => tenant.name === name);
  }

  public async findByID(id: string): Promise<Tenant | undefined> {
    return this.tenants.find(tenant => tenant.id === id);
  }
}
