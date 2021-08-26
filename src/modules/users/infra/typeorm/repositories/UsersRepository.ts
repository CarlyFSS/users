import { User } from '@fireheet/entities';
import { AbstractRepository, EntityRepository, getRepository } from 'typeorm';
import CreateUserDTO from '../../../dtos/CreateUserDTO';
import IUsersRepository from '../../../repositories/IUsersRepository';

@EntityRepository(User)
export default class UsersRepository
  extends AbstractRepository<User>
  implements IUsersRepository
{
  private readonly ormRepository = getRepository(User);

  public async create(data: CreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);

    return this.ormRepository.save(user);
  }

  public async update(user: User): Promise<User> {
    user.updated_at = new Date();

    await this.ormRepository.save(user);

    return this.findByID(user.id);
  }

  public async activate(user_id: string): Promise<User> {
    const user = await this.findByID(user_id);

    user.deleted_at = null;

    return this.ormRepository.save(user);
  }

  public async deactivate(user_id: string): Promise<User> {
    const user = await this.findByID(user_id);

    user.deleted_at = new Date();

    return this.ormRepository.save(user);
  }

  public async findByID(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ where: { id } });
  }

  public async findByDocument(
    document_number: string,
  ): Promise<User | undefined> {
    return this.ormRepository.findOne({
      where: {
        document_number,
      },
    });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ where: { email } });
  }
}
