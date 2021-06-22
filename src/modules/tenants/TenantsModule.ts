import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import TenantsController from './infra/http/routes/controllers/TenantsController';
import Tenant from './infra/typeorm/entities/Tenant';
import TenantsRepository from './infra/typeorm/repositories/TenantsRepository';
import CreateTenantService from './services/CreateTenantService';
import ListTenantService from './services/ListTenantService';
import UpdateTenantService from './services/UpdateTenantService';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tenant, TenantsRepository]),
    ClientsModule.register([
      {
        name: 'TENANTS_SERVICE',
        transport: Transport.RMQ,
        options: {
          // Não funcionou por causa que o ENV estava undefined
          urls: ['amqp://admin:admin@localhost:5672'],
          queue: 'tenants_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [TenantsController],
  providers: [CreateTenantService, UpdateTenantService, ListTenantService],
  exports: [TypeOrmModule],
})
export default class TenantsModule {}
