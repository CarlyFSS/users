import { Address } from '@fireheet/entities/typeorm/users';
import faker from 'faker';
import CreateAddressDTO from '../../models/dtos/CreateAddressDTO';

class FactoryObject {
  city = faker.address.cityName();

  country = faker.address.country();

  neighborhood = faker.address.streetPrefix();

  complement = faker.address.cardinalDirection();

  number = faker.datatype.number();

  zip_code = faker.address.zipCode();

  state = faker.address.state();

  street = faker.address.streetName();

  description = faker.address.streetSuffix();
}

export default function addressesMockFactory() {
  function createAddress(user_id: string): Address {
    const object = new FactoryObject();

    const id = faker.datatype.uuid();

    const address: Address = {
      id,
      user_id,
      ...object,
      created_at: new Date(),
      updated_at: new Date(),

      get info(): Partial<Address> {
        return {
          id,
          ...object,
        };
      },
    };

    return address;
  }

  function createAddressDTO(): CreateAddressDTO {
    const address = new FactoryObject();

    return {
      ...address,
    };
  }

  return { createAddress, createAddressDTO };
}
