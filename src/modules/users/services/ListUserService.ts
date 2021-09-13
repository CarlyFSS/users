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

  public async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findByID(id);

    if (!user) {
      throw new BadRequestException(`User with id "${id}" does not exists!`);
    }

    delete user.role_id;
    delete user.password;
    delete user.document_number;
    delete user.main_address_id;
    delete user.main_phone_id;

    const address = await this.addressesRepository.findByID(
      user.main_address_id,
    );

    if (address) {
      user.address = address;
    }

    return user;
  }
}
