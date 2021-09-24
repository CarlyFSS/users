import { AbstractRepository, EntityRepository, getRepository } from 'typeorm';
import { Role } from '@fireheet/entities/typeorm/users';
import IRolesRepository from '../../../repositories/IRolesRepository';

@EntityRepository(Role)
export default class RolesRepository
  extends AbstractRepository<Role>
  implements IRolesRepository
{
  private readonly ormRepository = getRepository(Role);

  public async listAll(offset = 0, limit = 5): Promise<Role[]> {
    return this.ormRepository.find({
      skip: offset,
      take: limit,
    });
  }

  public async findByID(id: string): Promise<Role | undefined> {
    return this.ormRepository.findOne({ where: { id } });
  }

  public async findByName(name: string): Promise<Role | undefined> {
    return this.ormRepository.findOne({ where: { name } });
  }
}
