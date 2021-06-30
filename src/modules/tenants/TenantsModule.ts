import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import Tenant from '@fireheet/entities/typeorm/Tenant';
import redisConfig from '@config/redis.config';
import AMQPProviderModule from '@shared/providers/AMQPProvider/AMQPProviderModule';
import TenantsController from './infra/http/routes/controllers/TenantsController';
import TenantsRepository from './infra/typeorm/repositories/TenantsRepository';
import CreateTenantService from './services/CreateTenantService';
import ListTenantService from './services/ListTenantService';
import UpdateTenantService from './services/UpdateTenantService';
import TenantsEventController from './infra/events/controllers/TenantsEventController';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Tenant, TenantsRepository]),
    CacheModule.register(redisConfig),
    AMQPProviderModule,
  ],
  controllers: [TenantsController, TenantsEventController],
  providers: [CreateTenantService, UpdateTenantService, ListTenantService],
  exports: [TypeOrmModule],
})
export default class TenantsModule {
  constructor() {}
}
