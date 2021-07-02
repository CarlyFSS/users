import User from '@fireheet/entities/typeorm/User';
import CreateUserDTO from '../dtos/CreateUserDTO';

export default interface IUsersRepository {
  create(data: CreateUserDTO): Promise<User>;
  update(user: User): Promise<User>;
  activate(user_id: string): Promise<User | undefined>;
  deactivate(user_id: string): Promise<User | undefined>;
  findByID(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByDocument(document_number: string): Promise<User | undefined>;
}
