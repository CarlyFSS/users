import faker from 'faker';
import { User } from '@fireheet/entities';
import CreateUserDTO from '../dtos/CreateUserDTO';

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

export default function UsersMockFactory() {
  function createUser(options?: FactoryOptions): User {
    const user: User = {
      id: faker.datatype.uuid(),
      role_id: options?.role_id || faker.datatype.uuid(),
      name: options?.name || faker.name.firstName(),
      email: options?.email || faker.random.word(),
      password: options?.password || faker.random.word(),
      birthdate: options?.birthdate || new Date(),
      document_number:
        options?.document_number || `${faker.datatype.number(999999)}`,
      sex: 'male',
      phone_id: options?.phone_id || null,
      main_address_id: options?.main_address_id || null,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,

      get information(): Partial<User> {
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
      document_number:
        options?.document_number || `${faker.datatype.number(999999)}`,
    };
  }

  return { createUserDTO, createUser };
}
