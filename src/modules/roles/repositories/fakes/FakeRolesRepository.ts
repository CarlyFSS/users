import Role from '@fireheet/entities/typeorm/Role';
import Tenant from '@fireheet/entities/typeorm/Tenant';
import IRolesRepository from '../IRolesRepository';

export default class FakeRolesRepository implements IRolesRepository {
  private roles: Role[] = [
    {
      id: '1',
      name: 'sysadmin',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  public async findByID(id: string): Promise<Tenant | undefined> {
    return this.roles.find(tenant => tenant.id === id);
  }

  public async listAll(): Promise<Role[]> {
    return this.roles;
  }
}
