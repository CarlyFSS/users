import { Controller, UseFilters } from '@nestjs/common';
import ErrorException from '@shared/exceptions/ErrorException';
import { OnEvent } from '@nestjs/event-emitter';
import { User } from '@fireheet/entities/typeorm/users';
import UsersCacheProvider from '../../../providers/CacheProvider/implementations/UsersCacheProvider';
import AddressesCacheProvider from '../../../../addresses/providers/implementations/AddressesCacheProvider';

@Controller('users-event-controller')
@UseFilters(ErrorException)
export default class UsersEventController {
  constructor(
    private readonly usersCache: UsersCacheProvider,
    private readonly addressCache: AddressesCacheProvider,
  ) {}

  // Send email confirmation
  @OnEvent('user.created', { async: true })
  async handleUserCreatedEvent(): Promise<void> {}

  @OnEvent('user.updated', { async: true })
  async handleUserUpdatedEvent(user: User): Promise<void> {
    await this.usersCache.delete(user.id);

    await this.usersCache.store(user.id, user);
  }

  // Reactivate after implementing the mail provider ( Receives an user )
  @OnEvent('user.email.updated', { async: true })
  async handleUserEmailUpdatedEvent(): Promise<void> {}

  // Send email to notify password change
  @OnEvent('user.password.updated', { async: true })
  async handleUserPasswordUpdatedEvent(user: User): Promise<void> {
    await this.usersCache.delete(user.id);
  }

  @OnEvent('user.deleted', { async: true })
  async handleUserDeactivatedEvent({
    id,
    main_address_id,
  }: User): Promise<void> {
    await this.usersCache.delete(id);

    await this.addressCache.delete(main_address_id);
  }

  // Send email to notify activation of the user and email confirmation
  @OnEvent('user.activated', { async: true })
  async handleUserActivatedEvent(): Promise<void> {}
}
