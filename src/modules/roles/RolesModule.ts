import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import redisConfig from '@config/redis.config';
import AMQPProviderModule from '@shared/providers/AMQPProvider/AMQPProviderModule';
import Role from '@fireheet/entities/typeorm/Role';
import RolesRepository from './infra/typeorm/repositories/RolesRepository';
import RolesController from './infra/http/routes/controllers/RolesController';
import RolesGrpcController from './infra/grpc/routes/controllers/RolesGrpcController';
import ListAllRolesService from './services/ListAllRolesService';
import ListRoleService from './services/ListRoleService';
import ListRoleByNameService from './services/ListRoleByNameService';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Role, RolesRepository]),
    CacheModule.register(redisConfig),
    AMQPProviderModule,
  ],
  controllers: [RolesController, RolesGrpcController],
  providers: [ListAllRolesService, ListRoleService, ListRoleByNameService],
  exports: [TypeOrmModule],
})
export default class RolesModule {
  constructor() {}
}
