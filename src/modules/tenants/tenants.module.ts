import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TenantsController from './infra/http/routes/controllers/tenants.controller';
import Tenant from './infra/typeorm/entities/tenant.entity';
import TenantsRepository from './infra/typeorm/repositories/tenants.repository';
import CreateTenantService from './services/create-tenant.service';
import ListTenantService from './services/list-tenant.service';
import UpdateTenantService from './services/update-tenant.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant, TenantsRepository])],
  controllers: [TenantsController],
  providers: [CreateTenantService, UpdateTenantService, ListTenantService],
  exports: [TypeOrmModule],
})
export default class TenantsModule {}
