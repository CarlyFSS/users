import { BadRequestException, Injectable } from '@nestjs/common';
import { Address } from '@fireheet/entities/typeorm/users';
import AddressesRepository from '../infra/typeorm/repositories/AddressesRepository';
import UsersRepository from '../../users/infra/typeorm/repositories/UsersRepository';

@Injectable()
export default class ListAllAddressesService {
  constructor(
    private readonly addressesRepository: AddressesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  public async execute(
    user_id: string,
    offset?: number,
    limit?: number,
  ): Promise<Partial<Address>[]> {
    const userExists = await this.usersRepository.findByID(user_id);

    if (!userExists) {
      throw new BadRequestException(
        `User with id "${user_id}" does not exists!`,
      );
    }

    return this.addressesRepository.findUserAddresses(user_id, offset, limit);
  }
}
