import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TenantsController from './infra/http/routes/controllers/TenantsController';
import Tenant from './infra/typeorm/entities/Tenant';
import TenantsRepository from './infra/typeorm/repositories/TenantsRepository';
import CreateTenantService from './services/CreateTenantService';
import ListTenantService from './services/ListTenantService';
import UpdateTenantService from './services/UpdateTenantService';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant, TenantsRepository])],
  controllers: [TenantsController],
  providers: [CreateTenantService, UpdateTenantService, ListTenantService],
  exports: [TypeOrmModule],
})
export default class TenantsModule {}
