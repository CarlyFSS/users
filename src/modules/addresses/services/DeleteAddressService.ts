import { Address } from '@fireheet/entities/typeorm/users';
import { BadRequestException, Injectable } from '@nestjs/common';
import UsersRepository from '../../users/infra/typeorm/repositories/UsersRepository';
import AddressesRepository from '../infra/typeorm/repositories/AddressesRepository';

@Injectable()
export default class DeleteAddressService {
  constructor(
    private readonly addressesRepository: AddressesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  public async execute(
    user_id: string,
    address_id: string,
  ): Promise<Partial<Address>> {
    const userExists = await this.usersRepository.findByID(user_id);

    if (!userExists) {
      throw new BadRequestException(
        `User with id "${user_id}" does not exists!`,
      );
    }

    const addressExists = await this.addressesRepository.findByID(address_id);

    if (!addressExists) {
      throw new BadRequestException(
        `Address with index "${address_id}" does not exists!`,
      );
    }

    return (await this.addressesRepository.delete(addressExists)).info;
  }
}
