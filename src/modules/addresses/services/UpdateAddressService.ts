import { BadRequestException, Injectable } from '@nestjs/common';
import { Address } from '@fireheet/entities';
import { EventEmitter2 } from '@nestjs/event-emitter';
import AddressesRepository from '../infra/typeorm/repositories/AddressesRepository';
import UsersRepository from '../../users/infra/typeorm/repositories/UsersRepository';
import UpdateAddressDTO from '../models/dtos/UpdateAddressDTO';

@Injectable()
export default class UpdateAddressService {
  constructor(
    private readonly addressesRepository: AddressesRepository,
    private readonly usersRepository: UsersRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async execute(
    user_id: string,
    address_id: string,
    {
      city,
      complement,
      country,
      neighborhood,
      number,
      zip_code,
      state,
      street,
    }: UpdateAddressDTO,
  ): Promise<Address> {
    const userExists = await this.usersRepository.findByID(user_id);

    if (!userExists) {
      throw new BadRequestException(
        `User with id "${user_id}" does not exists!`,
      );
    }

    const addressExists = await this.addressesRepository.findByID(address_id);

    if (!addressExists) {
      throw new BadRequestException(
        `Address with id "${address_id}" does not exists!`,
      );
    }

    addressExists.city = city;
    addressExists.complement = complement;
    addressExists.country = country;
    addressExists.neighborhood = neighborhood;
    addressExists.number = number;
    addressExists.zip_code = zip_code;
    addressExists.state = state;
    addressExists.street = street;

    const address = await this.addressesRepository.update(addressExists);

    this.eventEmitter.emit('address.updated', address);

    return address;
  }
}
