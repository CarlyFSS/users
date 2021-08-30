import { Controller, UseFilters } from '@nestjs/common';
import ErrorException from '@shared/exceptions/ErrorException';
import { OnEvent } from '@nestjs/event-emitter';
import { User } from '@fireheet/entities';
import UsersCacheProvider from '../../../providers/CacheProvider/implementations/UsersCacheProvider';
import AddressesCacheProvider from '../../../../addresses/providers/implementations/AddressesCacheProvider';

@Controller('users-event-controller')
@UseFilters(ErrorException)
export default class UsersEventController {
  constructor(
    private readonly usersCache: UsersCacheProvider,
    private readonly addressCache: AddressesCacheProvider,
  ) {}

  @OnEvent('user.created', { async: true })
  async handleUserCreatedEvent(): Promise<void> {
    // Send email confirmation
  }

  @OnEvent('user.updated', { async: true })
  async handleUserUpdatedEvent(user: User): Promise<void> {
    await this.usersCache.delete(user.id);

    await this.usersCache.store(user.id, user);
  }

  @OnEvent('user.email.updated', { async: true })
  async handleUserEmailUpdatedEvent(user: User): Promise<void> {
    await this.usersCache.delete(user.id);

    await this.usersCache.store(user.id, user);

    // Send email confirmation
  }

  @OnEvent('user.password.updated', { async: true })
  async handleUserPasswordUpdatedEvent(user: User): Promise<void> {
    await this.usersCache.delete(user.id);

    // Send email to notify password change
  }

  @OnEvent('user.deleted', { async: true })
  async handleUserDeactivatedEvent({
    id,
    main_address_id,
  }: User): Promise<void> {
    await this.usersCache.delete(id);

    await this.addressCache.delete(main_address_id);
  }

  @OnEvent('user.activated', { async: true })
  async handleUserActivatedEvent(): Promise<void> {
    // Send email to notify activation of the user and email confirmation
  }
}
