import { Role } from '@fireheet/entities/typeorm/users';

export default interface IRolesRepository {
  listAll(offset?: number, limit?: number): Promise<Role[]>;
  findByID(id: string): Promise<Role | undefined>;
  findByName(name: string): Promise<Role | undefined>;
}
