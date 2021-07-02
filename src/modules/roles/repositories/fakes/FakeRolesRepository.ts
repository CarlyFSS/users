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
    {
      id: '2',
      name: 'admin',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  public async findByID(id: string): Promise<Role | undefined> {
    return this.roles.find(role => role.id === id);
  }

  public async findByName(name: string): Promise<Role | undefined> {
    return this.roles.find(role => role.name === name);
  }

  public async listAll(): Promise<Role[]> {
    return this.roles;
  }
}
