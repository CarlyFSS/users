import { Phone } from '@fireheet/entities/typeorm/users';
import faker from 'faker';
import CreatePhoneDTO from '../../models/dtos/CreatePhoneDTO';

interface FactoryOptions {
  user_id?: string;
  country_code?: string;
  prefix?: string;
  number?: string;
  verified?: boolean;
}

export default function PhonesMockFactory() {
  function createPhone(options?: FactoryOptions): Phone {
    const phone: Phone = {
      id: faker.datatype.uuid(),
      user_id: options?.user_id || faker.datatype.uuid(),
      country_code: options?.country_code || `${faker.datatype.number(999)}`,
      number: options?.number || `999999999`,
      prefix: options?.prefix || `${faker.datatype.number(99)}`,
      verified: options?.verified || true,
      created_at: new Date(),
      updated_at: new Date(),

      get info(): Partial<Phone> {
        return {
          id: this.id,
        };
      },
    };

    return phone;
  }

  function createPhoneDTO(options?: FactoryOptions): CreatePhoneDTO {
    return {
      country_code: options?.country_code || `${faker.datatype.number(999)}`,
      number: options?.number || `999999999`,
      prefix: options?.prefix || faker.datatype.number(99),
    };
  }

  return { createPhone, createPhoneDTO };
}
