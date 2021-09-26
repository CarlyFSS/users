import { Injectable } from '@nestjs/common';
import { Address } from '@fireheet/entities/typeorm/users';
import ListAddressService from './ListAddressService';
import ListAllAddressesService from './ListAllAddressesService';
import AddressesCacheProvider from '../providers/implementations/AddressesCacheProvider';

@Injectable()
export default class AddressesCacheVerifierService {
  constructor(
    private readonly listAddress: ListAddressService,
    private readonly listAllAddresses: ListAllAddressesService,
    private readonly addressesCache: AddressesCacheProvider,
  ) {}

  public async execute(
    user_id: string,
    address_id: string,
    offset: number,
    limit: number,
  ): Promise<Partial<Address> | Partial<Address>[] | undefined> {
    let addresses: Partial<Address> | Partial<Address>[] | undefined;

    if (!address_id) {
      addresses = await this.addressesCache.get(user_id, true);

      if (!addresses) {
        addresses = await this.listAllAddresses.execute(user_id, offset, limit);

        this.addressesCache.storeMany(addresses, user_id);
      }

      return addresses;
    }

    addresses = await this.addressesCache.get(address_id);

    if (!addresses) {
      addresses = await this.listAddress.execute(user_id, address_id);

      await this.addressesCache.store(address_id, addresses);
    }

    return addresses;
  }
}
