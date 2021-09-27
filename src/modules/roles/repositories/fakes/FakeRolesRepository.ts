import { Role } from '@fireheet/entities/typeorm/users';
import {
  PAGINATION_LIMIT,
  PAGINATION_OFFSET,
} from '../../../../shared/config/DefaultValues';
import RolesMockFactory from '../../factories/mocks/RolesMockFactory';
import IRolesRepository from '../IRolesRepository';

export default class FakeRolesRepository implements IRolesRepository {
  private readonly roles: Role[] = [
    RolesMockFactory({ name: 'SYSADMIN' }),
    RolesMockFactory({ name: 'ADMIN' }),
    RolesMockFactory({ name: 'CLIENT' }),
    RolesMockFactory({ name: 'MANAGER' }),
    RolesMockFactory({ name: 'EMPLOYEE' }),
    RolesMockFactory({ name: 'TEST2' }),
    RolesMockFactory({ name: 'TEST3' }),
  ];

  public async findByID(id: string): Promise<Role | undefined> {
    return this.roles.find(role => role.id === id);
  }

  public async findByName(name: string): Promise<Role | undefined> {
    return this.roles.find(role => role.name === name);
  }

  public async listAll(
    offset = PAGINATION_OFFSET,
    limit = PAGINATION_LIMIT,
  ): Promise<Role[]> {
    const roles: Role[] = [];

    let count = offset;

    this.roles.forEach(role => {
      if (count <= limit) {
        roles.push(role);

        count += 1;
      }
    });

    return roles;
  }
}
