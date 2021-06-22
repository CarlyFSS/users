import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import Tenant from '@fireheet/entities/typeorm/Tenant';
import TenantsController from './infra/http/routes/controllers/TenantsController';
import TenantsRepository from './infra/typeorm/repositories/TenantsRepository';
import CreateTenantService from './services/CreateTenantService';
import ListTenantService from './services/ListTenantService';
import UpdateTenantService from './services/UpdateTenantService';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Tenant, TenantsRepository]),
    RabbitMQModule.externallyConfigured(RabbitMQModule, 0),
  ],
  controllers: [TenantsController],
  providers: [CreateTenantService, UpdateTenantService, ListTenantService],
  exports: [TypeOrmModule],
})
export default class TenantsModule {
  constructor() {}
}
