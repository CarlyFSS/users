import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@fireheet/entities';
import RedisConfig from '@config/RedisConfig';
import AMQPProviderModule from '@shared/providers/AMQPProvider/AMQPProviderModule';
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
import CacheProviderModule from '../../shared/providers/CacheProvider/CacheProviderModule';
import UsersCacheVerifierService from './services/UsersCacheVerifierService';
import UsersCacheProvider from './providers/CacheProvider/implementations/UsersCacheProvider';

@Module({
  imports: [
    RolesModule,
    CacheModule.register(RedisConfig),
    CacheProviderModule,
    TypeOrmModule.forFeature([User, UsersRepository]),
    AMQPProviderModule,
    HashProviderModule,
  ],
  controllers: [UsersController, UsersEventController, UsersGrpcController],
  providers: [
    CreateUserService,
    UpdateUserService,
    ListUserService,
    ListRoleByNameService,
    UsersCacheProvider,
    UsersCacheVerifierService,
  ],
  exports: [TypeOrmModule],
})
export default class UsersModule {}
