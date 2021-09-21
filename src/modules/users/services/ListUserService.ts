import { User } from '@fireheet/entities';
import { BadRequestException, Injectable } from '@nestjs/common';
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
      throw new BadRequestException(
        `User with id "${user_id}" does not exists!`,
      );
    }

    const address = await this.addressesRepository.findByID(
      user.main_address_id,
    );

    const returnedUser: Partial<User> = {
      ...user.information,
      address: address?.information,
      phone: undefined,
    };

    return returnedUser;
  }
}
