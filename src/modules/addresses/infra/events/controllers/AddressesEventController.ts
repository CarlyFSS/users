import { Controller, UseFilters } from '@nestjs/common';
import ErrorException from '@shared/exceptions/ErrorException';
import { OnEvent } from '@nestjs/event-emitter';
import { Address } from '@fireheet/entities/typeorm/users';
import AddressesCacheProvider from '../../../providers/implementations/AddressesCacheProvider';
import UsersCacheProvider from '../../../../users/providers/CacheProvider/implementations/UsersCacheProvider';

@Controller('addresses-event-controller')
@UseFilters(ErrorException)
export default class AddressesEventController {
  constructor(
    private readonly addressesCache: AddressesCacheProvider,
    private readonly usersCache: UsersCacheProvider,
  ) {}

  @OnEvent('address.created', { async: true })
  async handleAddressCreatedEvent(user_id: string): Promise<void> {
    await this.usersCache.delete(user_id);
    await this.addressesCache.delete(user_id);
  }

  @OnEvent('address.updated', { async: true })
  async handleAddressUpdatedEvent(address: Address): Promise<void> {
    await this.usersCache.delete(address.user_id);

    await this.addressesCache.delete(address.id);

    await this.addressesCache.store(address.id, address);

    await this.addressesCache.delete(
      address.user_id,
      undefined,
      undefined,
      true,
    );
  }
}
