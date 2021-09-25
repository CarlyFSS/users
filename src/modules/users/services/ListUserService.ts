import { User } from '@fireheet/entities/typeorm/users';
import { Injectable, NotFoundException } from '@nestjs/common';
import AddressesRepository from '../../addresses/infra/typeorm/repositories/AddressesRepository';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

@Injectable()
export default class ListUserService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly addressesRepository: AddressesRepository,
  ) {}

  public async execute(user_id: string): Promise<Partial<User>> {
    const user = await this.usersRepository.findByID(user_id);

    if (!user) {
      throw new NotFoundException(`User with id "${user_id}" does not exist!`);
    }

    const address = await this.addressesRepository.findByID(
      user.main_address_id,
    );

    const returnedUser: Partial<User> = {
      ...user.info,
      address: address?.info || undefined,
      phone: undefined,
    };

    return returnedUser;
  }
}
