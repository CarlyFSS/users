import { User } from '@fireheet/entities/typeorm/users';
import faker from 'faker';
import CreateUserDTO from '../../models/dtos/CreateUserDTO';

interface FactoryOptions {
  name?: string;
  email?: string;
  role_id?: string;
  password?: string;
  document_number?: string;
  main_address_id?: string;
  phone_id?: string;
  birthdate?: Date;
}

export default function usersMockFactory() {
  function createUser(options?: FactoryOptions): User {
    const user: User = {
      id: faker.datatype.uuid(),
      role_id: options?.role_id || faker.datatype.uuid(),
      name: options?.name || faker.name.firstName(),
      email: options?.email || faker.random.word(),
      password: options?.password || faker.random.word(),
      birthdate: options?.birthdate || new Date(),
      document_number: options?.document_number || `${faker.datatype.number()}`,
      sex: 'male',
      phone_id: options?.phone_id || '',
      main_address_id: options?.main_address_id || '',
      created_at: new Date(),
      updated_at: new Date(),

      get info(): Partial<User> {
        return {
          id: this.id,
          name: this.name,
          email: this.email,
          birthdate: this.birthdate,
          sex: this.sex,
          document_number: this.document_number,
        };
      },
    };

    return user;
  }

  function createUserDTO(options?: FactoryOptions): CreateUserDTO {
    return {
      role_id: options?.role_id || faker.datatype.uuid(),
      name: options?.name || faker.name.firstName(),
      email: options?.email || faker.random.word(),
      password: options?.password || faker.random.word(),
      birthdate: options?.birthdate || new Date(),
      document_number: options?.document_number || `${faker.datatype.number()}`,
    };
  }

  return { createUserDTO, createUser };
}
