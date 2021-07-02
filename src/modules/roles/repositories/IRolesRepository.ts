import Role from '@fireheet/entities/typeorm/Role';

export default interface IRolesRepository {
  listAll(): Promise<Role[]>;
  findByID(id: string): Promise<Role | undefined>;
  findByName(name: string): Promise<Role | undefined>;
}
