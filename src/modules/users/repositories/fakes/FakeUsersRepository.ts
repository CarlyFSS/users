import { User } from '@fireheet/entities/typeorm/users';
import IUsersRepository from '../IUsersRepository';
import CreateUserDTO from '../../models/dtos/CreateUserDTO';
import UsersMockFactory from '../../factories/mocks/UsersMockFactory';

export default class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  private readonly mockFactory = UsersMockFactory;

  public async create(data: CreateUserDTO, role_id?: string): Promise<User> {
    const user: User = this.mockFactory().createUser({ ...data, role_id });

    this.users.push(user);

    return user;
  }

  public async update(user: User): Promise<User> {
    const userIdx = this.users.indexOf(user);

    this.users[userIdx] = user;

    return this.users[userIdx];
  }

  public async delete(user_id: string): Promise<User | undefined> {
    const foundUser = this.users.find(user => user.id === user_id);

    if (foundUser) {
      const userIdx = this.users.indexOf(foundUser);

      this.users[userIdx].deleted_at = new Date();

      return this.users[userIdx];
    }

    return undefined;
  }

  public async restore(user_id: string): Promise<User | undefined> {
    const foundUser = this.users.find(user => user.id === user_id);

    if (foundUser) {
      const userIdx = this.users.indexOf(foundUser);

      this.users[userIdx].deleted_at = undefined;

      return this.users[userIdx];
    }

    return undefined;
  }

  public async findByID(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  public async findByDocument(
    documentNumber: string,
  ): Promise<User | undefined> {
    return this.users.find(user => user.document_number === documentNumber);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }
}
