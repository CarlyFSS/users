import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import User from '@fireheet/entities/typeorm/User';
import redisConfig from '@config/redis.config';
import AMQPProviderModule from '@shared/providers/AMQPProvider/AMQPProviderModule';
import Tenant from '@fireheet/entities/typeorm/Tenant';
import Role from '@fireheet/entities/typeorm/Role';
import UsersRepository from './infra/typeorm/repositories/UsersRepository';
import HashProviderModule from './providers/HashProvider/HashProviderModule';
import UsersController from './infra/http/routes/controllers/UsersController';
import CreateUserService from './services/CreateUserService';
import UpdateUserService from './services/UpdateUserService';
import ListUserService from './services/ListUserService';
import UsersEventController from './infra/events/controllers/UsersEventController';
import TenantsModule from '../tenants/TenantsModule';
import RolesModule from '../roles/RolesModule';
import ListRoleByNameService from '../roles/services/ListRoleByNameService';
import CreateTenantService from '../tenants/services/CreateTenantService';
import TenantsRepository from '../tenants/infra/typeorm/repositories/TenantsRepository';
import RolesRepository from '../roles/infra/typeorm/repositories/RolesRepository';

@Module({
  imports: [
    ConfigModule,
    TenantsModule,
    RolesModule,
    TypeOrmModule.forFeature([User, UsersRepository]),
    CacheModule.register(redisConfig),
    AMQPProviderModule,
    HashProviderModule,
  ],
  controllers: [UsersController, UsersEventController],
  providers: [
    CreateUserService,
    UpdateUserService,
    ListUserService,
    CreateTenantService,
    ListRoleByNameService,
  ],
  exports: [TypeOrmModule],
})
export default class UsersModule {
  constructor() {}
}
