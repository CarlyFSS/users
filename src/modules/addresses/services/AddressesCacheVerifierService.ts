import { Injectable } from '@nestjs/common';
import { Address } from '@fireheet/entities';
import ListAddressService from './ListAddressService';
import ListAllAddressesService from './ListAllAddressesService';
import AddressesCacheProvider from '../../../shared/providers/CacheProvider/implementations/addresses/AddressesCacheProvider';

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
  ): Promise<Address | Address[]> {
    if (!address_id) {
      let addresses: Address[] = [];

      addresses = await this.addressesCache.get<Address[]>(user_id, true);

      if (!addresses) {
        addresses = await this.listAllAddresses.execute(user_id);

        this.addressesCache.storeMany(addresses, user_id);
      }

      return addresses;
    }

    let address: Address = await this.addressesCache.get<Address>(address_id);

    if (!address) {
      address = await this.listAddress.execute(user_id, address_id);

      await this.addressesCache.store(address.id, address);
    }

    return address;
  }
}
