import { CACHE_MANAGER, Controller, Inject, UseFilters } from '@nestjs/common';
import ErrorException from '@shared/exceptions/ErrorException';
import { OnEvent } from '@nestjs/event-emitter';
import { Cache } from 'cache-manager-redis-store';
import RabbitMQProvider from '@shared/providers/AMQPProvider/implementations/RabbitMQProvider';
import User from '@fireheet/entities/typeorm/User';

@Controller('users-event-controller')
@UseFilters(ErrorException)
export default class UsersEventController {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly rabbitMQProvider: RabbitMQProvider,
  ) {}

  @OnEvent('user.created', { async: true })
  async handleTenantCreatedEvent(user: User): Promise<User> {
    const exchange = 'users.exchange';
    const routingKey = 'user';

    // Send to exchange
    this.rabbitMQProvider.publishInExchange(exchange, routingKey, user);

    // Then send the confirmation email

    return user;
  }

  @OnEvent('user.updated', { async: true })
  async handleTenantUpdatedEvent(user: User): Promise<User> {
    const exchange = 'users.exchange';
    const routingKey = 'user';

    this.rabbitMQProvider.publishInExchange(exchange, routingKey, user);

    await this.cacheManager.del(`${user.id}-user`);

    // Send the email notifying that the password was changed

    return user;
  }
}
