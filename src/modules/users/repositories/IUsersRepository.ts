import { User } from '@fireheet/entities/typeorm/users';
import CreateUserDTO from '../models/dtos/CreateUserDTO';

export default interface IUsersRepository {
  create(data: CreateUserDTO): Promise<User>;
  update(user: User): Promise<User>;
  restore(user_id: string): Promise<User | undefined>;
  delete(user_id: string): Promise<User | undefined>;
  findByID(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByDocument(document_number: string): Promise<User | undefined>;
}
