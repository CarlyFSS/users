import Tenant from '@fireheet/entities/typeorm/Tenant';
import CreateTenantDTO from '../dtos/CreateTenantDTO';

export default interface ITenantsRepository {
  create(data: CreateTenantDTO): Promise<Tenant>;
  update(tenant: Tenant): Promise<Tenant>;
  findByName(name: string): Promise<Tenant | undefined>;
  findByID(id: string): Promise<Tenant | undefined>;
}
