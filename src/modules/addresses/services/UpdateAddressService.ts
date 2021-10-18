import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Address } from '@fireheet/entities/typeorm/users';
import AddressesRepository from '../infra/typeorm/repositories/AddressesRepository';
import UsersRepository from '../../users/infra/typeorm/repositories/UsersRepository';
import UpdateAddressDTO from '../models/dtos/UpdateAddressDTO';

// function mix(...sources: Address[] | UpdateAddressDTO[]) {
//   const result = {};

//   sources.forEach(source => {
//     const props = Object.keys(source);

//     props.forEach(prop => {
//       const descriptor = Object.getOwnPropertyDescriptor(source, prop);

//       if (descriptor?.value !== undefined) {
//         Object.defineProperty(result, prop, descriptor);
//       }
//     });
//   });

//   return result;
// }

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
    data: UpdateAddressDTO,
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
        `Address with id "${address_id}" does not exists!`,
      );
    }

    userExists.main_address_id = address_id;

    const updateAddress = Object.assign(addressExists, data);

    const address = await this.addressesRepository.update(updateAddress);

    await this.usersRepository.update(userExists);

    this.eventEmitter.emit('address.updated', address);

    return address.info;
  }
}
