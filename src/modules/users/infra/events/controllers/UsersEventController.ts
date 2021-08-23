import { Controller, UseFilters } from '@nestjs/common';
import ErrorException from '@shared/exceptions/ErrorException';
import { OnEvent } from '@nestjs/event-emitter';
import { User } from '@fireheet/entities';

@Controller('users-event-controller')
@UseFilters(ErrorException)
export default class UsersEventController {
  constructor() {}

  @OnEvent('user.created', { async: true })
  async handleTenantCreatedEvent(user: User): Promise<User> {
    // Send email confirmation

    return user;
  }

  @OnEvent('user.updated', { async: true })
  async handleTenantUpdatedEvent(user: User): Promise<void> {}

  @OnEvent('user.email.updated', { async: true })
  async handleUserEmailUpdatedEvent(user: User): Promise<void> {
    // Send email confirmation
  }

  @OnEvent('user.password.updated', { async: true })
  async handleUserPasswordUpdatedEvent(user: User): Promise<User> {
    // Send email to notify password change

    return user;
  }
}
