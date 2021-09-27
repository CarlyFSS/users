import { Role } from '@fireheet/entities/typeorm/users';
import faker from 'faker';

interface FactoryOptions {
  name?: string;
}

export default function RolesMockFactory(options?: FactoryOptions) {
  const role: Role = {
    id: faker.datatype.uuid(),
    name: options?.name || faker.name.jobTitle(),
    created_at: new Date(),
    updated_at: new Date(),

    get info(): Partial<Role> {
      return {
        id: this.id,
        name: this.name,
      };
    },
  };

  return role;
}
