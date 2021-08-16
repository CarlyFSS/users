import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@fireheet/entities';
import redisConfig from '@config/redis.config';
import AMQPProviderModule from '@shared/providers/AMQPProvider/AMQPProviderModule';
import { APP_GUARD } from '@nestjs/core';
import UsersRepository from './infra/typeorm/repositories/UsersRepository';
import HashProviderModule from './providers/HashProvider/HashProviderModule';
import UsersController from './infra/http/routes/controllers/UsersController';
import CreateUserService from './services/CreateUserService';
import UpdateUserService from './services/UpdateUserService';
import ListUserService from './services/ListUserService';
import UsersEventController from './infra/events/controllers/UsersEventController';
import RolesModule from '../roles/RolesModule';
import ListRoleByNameService from '../roles/services/ListRoleByNameService';
import UsersGrpcController from './infra/grpc/routes/controllers/UsersGrpcController';

@Module({
  imports: [
    ConfigModule,
    RolesModule,
    TypeOrmModule.forFeature([User, UsersRepository]),
    CacheModule.register(redisConfig),
    AMQPProviderModule,
    HashProviderModule,
  ],
  controllers: [UsersController, UsersEventController, UsersGrpcController],
  providers: [
    CreateUserService,
    UpdateUserService,
    ListUserService,
    ListRoleByNameService,
  ],
  exports: [TypeOrmModule],
})
export default class UsersModule {
  constructor() {}
}
