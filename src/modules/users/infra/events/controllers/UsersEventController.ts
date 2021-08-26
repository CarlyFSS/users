import { Controller, UseFilters } from '@nestjs/common';
import ErrorException from '@shared/exceptions/ErrorException';
import { OnEvent } from '@nestjs/event-emitter';
import { User } from '@fireheet/entities';
import UsersCacheProvider from '../../../providers/CacheProvider/implementations/UsersCacheProvider';

@Controller('users-event-controller')
@UseFilters(ErrorException)
export default class UsersEventController {
  constructor(private readonly usersCache: UsersCacheProvider) {}

  @OnEvent('user.created', { async: true })
  async handleTenantCreatedEvent(user: User): Promise<void> {
    // Send email confirmation

  }

  @OnEvent('user.updated', { async: true })
  async handleTenantUpdatedEvent(user: User): Promise<void> {
    await this.usersCache.delete(user.id);
  }

  @OnEvent('user.email.updated', { async: true })
  async handleUserEmailUpdatedEvent(user: User): Promise<void> {
    await this.usersCache.delete(user.id);

    // Send email confirmation
  }

  @OnEvent('user.password.updated', { async: true })
  async handleUserPasswordUpdatedEvent(user: User): Promise<void> {
    await this.usersCache.delete(user.id);

    // Send email to notify password change

  }
}
