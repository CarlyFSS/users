import { Address } from '@fireheet/entities/typeorm/users';
import faker from 'faker';
import CreateAddressDTO from '../dtos/CreateAddressDTO';

interface FactoryOptions {
  user_id?: string;
  city?: string;
  country?: string;
  neighborhood?: string;
  complement?: string;
  number?: number;
  zip_code?: string;
  state?: string;
  street?: string;
  description?: string;
}

export default function AddressesMockFactory() {
  function createAddress(options?: FactoryOptions): Address {
    const address: Address = {
      id: faker.datatype.uuid(),
      user_id: options?.user_id || faker.datatype.uuid(),
      city: options?.city || faker.address.cityName(),
      country: options?.country || faker.address.country(),
      neighborhood: options?.neighborhood || faker.address.streetPrefix(),
      complement: options?.complement || faker.address.cardinalDirection(),
      number: options?.number || faker.datatype.number(9999),
      zip_code: options?.zip_code || faker.address.zipCode(),
      state: options?.state || faker.address.state(),
      street: options?.street || faker.address.streetName(),
      description: options?.description || faker.address.streetSuffix(),
      created_at: new Date(),
      updated_at: new Date(),

      get info(): Partial<Address> {
        return {
          id: this.id,
          city: this.city,
          country: this.country,
          neighborhood: this.neighborhood,
          complement: this.complement,
          number: this.number,
          zip_code: this.zip_code,
          state: this.state,
          street: this.street,
          description: this.description,
        };
      },
    };

    return address;
  }

  function createAddressDTO(options?: FactoryOptions): CreateAddressDTO {
    return {
      city: options?.city || faker.address.cityName(),
      country: options?.country || faker.address.country(),
      neighborhood: options?.neighborhood || faker.address.streetPrefix(),
      complement: options?.complement || faker.address.cardinalDirection(),
      number: options?.number || faker.datatype.number(9999),
      zip_code: options?.zip_code || faker.address.zipCode(),
      state: options?.state || faker.address.state(),
      street: options?.street || faker.address.streetName(),
      description: options?.description || faker.address.streetSuffix(),
    };
  }

  return { createAddress, createAddressDTO };
}
