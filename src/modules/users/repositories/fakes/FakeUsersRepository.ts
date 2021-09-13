import { User } from '@fireheet/entities';
import faker from 'faker';
import IUsersRepository from '../IUsersRepository';
import CreateUserDTO from '../../dtos/CreateUserDTO';

export default class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create(
    { name, email, password, document_number }: CreateUserDTO,
    role_id?: string,
  ): Promise<User> {
    const user: User = {
      name,
      email,
      password,
      role_id,
      document_number,
      id: faker.datatype.uuid(),
      sex: null,
      birthdate: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
      main_address_id: null,
      main_phone_id: null,
    };

    this.users.push(user);

    return user;
  }

  public async update(user: User): Promise<User> {
    const userIdx = this.users.indexOf(user);

    this.users[userIdx] = user;

    return this.users[userIdx];
  }

  public async deactivate(user_id: string): Promise<User | undefined> {
    const foundUser = this.users.find(user => user.id === user_id);

    const userIdx = this.users.indexOf(foundUser);

    this.users[userIdx].deleted_at = new Date();

    return this.users[userIdx];
  }

  public async activate(user_id: string): Promise<User | undefined> {
    const foundUser = this.users.find(user => user.id === user_id);

    const userIdx = this.users.indexOf(foundUser);

    this.users[userIdx].deleted_at = null;

    return this.users[userIdx];
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
