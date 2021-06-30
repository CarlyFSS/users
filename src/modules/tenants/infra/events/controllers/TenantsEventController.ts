import { CACHE_MANAGER, Controller, Inject, UseFilters } from '@nestjs/common';
import ErrorException from '@shared/exceptions/ErrorException';
import Tenant from '@fireheet/entities/typeorm/Tenant';
import { OnEvent } from '@nestjs/event-emitter';
import { Cache } from 'cache-manager-redis-store';
import RabbitMQProvider from '@shared/providers/AMQPProvider/implementations/RabbitMQProvider';

@Controller('tenants-event-controller')
@UseFilters(ErrorException)
export default class TenantsEventController {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly rabbitMQProvider: RabbitMQProvider,
  ) {}

  @OnEvent('tenant.created', { async: true })
  async handleTenantCreatedEvent(tenant: Tenant): Promise<Tenant> {
    const exchange = 'users.exchange';
    const routingKey = 'tenant';

    this.rabbitMQProvider.publishInExchange(exchange, routingKey, tenant);

    return tenant;
  }

  @OnEvent('tenant.updated', { async: true })
  async handleTenantUpdatedEvent(tenant: Tenant): Promise<Tenant> {
    const exchange = 'users.exchange';
    const routingKey = 'tenant';

    this.rabbitMQProvider.publishInExchange(exchange, routingKey, tenant);

    await this.cacheManager.del(`${tenant.id}-tenant`);

    return tenant;
  }
}
