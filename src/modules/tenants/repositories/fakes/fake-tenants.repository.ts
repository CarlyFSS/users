import CreateTenantDTO from '@modules/tenants/dtos/create-tenant.dto';
import Tenant from '@modules/tenants/infra/typeorm/entities/tenant.entity';
import { random } from 'faker';
import ITenantsRepository from '../i-tenants.repository';

export default class FakeTenantsRepository implements ITenantsRepository {
  private tenants: Tenant[] = [];

  public async create({ name }: CreateTenantDTO): Promise<Tenant> {
    const tenant: Tenant = {
      id: random.uuid(),
      name,
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
