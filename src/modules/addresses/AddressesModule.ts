import UsersModule from '@modules/users/UsersModule';
import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Address, User } from '@fireheet/entities';
import RedisConfig from '@config/RedisConfig';
import AMQPProviderModule from '@shared/providers/AMQPProvider/AMQPProviderModule';
import RolesModule from '../roles/RolesModule';
import CacheProviderModule from '../../shared/providers/CacheProvider/CacheProviderModule';
import AddressesController from './infra/http/routes/controllers/AddressController';
import AddressesRepository from './infra/typeorm/repositories/AddressesRepository';
import ListAllAddressesService from './services/ListAllAddressesService';
import UpdateAddressService from './services/UpdateAddressService';
import ListAddressService from './services/ListAddressService';
import CreateAddressService from './services/CreateAddressService';
import DeleteAddressService from './services/DeleteAddressService';

@Module({
  imports: [
    RolesModule,
    CacheModule.register(RedisConfig),
    CacheProviderModule,
    TypeOrmModule.forFeature([Address, AddressesRepository]),
    AMQPProviderModule,
    UsersModule,
  ],
  controllers: [AddressesController],
  providers: [
    CreateAddressService,
    ListAddressService,
    ListAllAddressesService,
    UpdateAddressService,
    DeleteAddressService,
  ],
  exports: [TypeOrmModule],
})
export default class AddressesModule {}
