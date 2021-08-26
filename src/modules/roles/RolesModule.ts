import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Role } from '@fireheet/entities';
import RolesRepository from './infra/typeorm/repositories/RolesRepository';
import RolesController from './infra/http/routes/controllers/RolesController';
import RolesGrpcController from './infra/grpc/routes/controllers/RolesGrpcController';
import ListAllRolesService from './services/ListAllRolesService';
import ListRoleService from './services/ListRoleService';
import ListRoleByNameService from './services/ListRoleByNameService';
import CacheProviderModule from '../../shared/providers/CacheProvider/CacheProviderModule';
import RedisConfig from '../../config/RedisConfig';
import AMQPProviderModule from '../../shared/providers/AMQPProvider/AMQPProviderModule';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Role, RolesRepository]),
    CacheModule.register(RedisConfig),
    AMQPProviderModule,
    CacheProviderModule,
  ],
  controllers: [RolesController, RolesGrpcController],
  providers: [ListAllRolesService, ListRoleService, ListRoleByNameService],
  exports: [TypeOrmModule],
})
export default class RolesModule {}
