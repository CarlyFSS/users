import { Role } from '@fireheet/entities';
import IRolesRepository from '../IRolesRepository';

export default class FakeRolesRepository implements IRolesRepository {
  private roles: Role[] = [
    {
      id: '1',
      name: 'SYSADMIN',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '2',
      name: 'ADMIN',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '3',
      name: 'CLIENT',
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
