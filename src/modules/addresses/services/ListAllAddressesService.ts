import { BadRequestException, Injectable } from '@nestjs/common';
import { Address } from '@fireheet/entities';
import AddressesRepository from '../infra/typeorm/repositories/AddressesRepository';
import UsersRepository from '../../users/infra/typeorm/repositories/UsersRepository';

@Injectable()
export default class ListAllAddressesService {
  constructor(
    private readonly addressesRepository: AddressesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  public async execute(user_id: string): Promise<Address[]> {
    const userExists = await this.usersRepository.findByID(user_id);

    if (!userExists) {
      throw new BadRequestException(
        `User with id "${user_id}" does not exists!`,
      );
    }

    const userAddresses = await this.addressesRepository.findUserAddresses(
      user_id,
    );

    return userAddresses;
  }
}
