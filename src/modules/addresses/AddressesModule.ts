import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Address } from '@fireheet/entities';
import { APP_INTERCEPTOR } from '@nestjs/core';
import RolesModule from '../roles/RolesModule';
import CacheProviderModule from '../../shared/providers/CacheProvider/CacheProviderModule';
import AddressesController from './infra/http/routes/controllers/AddressController';
import AddressesRepository from './infra/typeorm/repositories/AddressesRepository';
import ListAllAddressesService from './services/ListAllAddressesService';
import UpdateAddressService from './services/UpdateAddressService';
import ListAddressService from './services/ListAddressService';
import CreateAddressService from './services/CreateAddressService';
import DeleteAddressService from './services/DeleteAddressService';
import UsersModule from '../users/UsersModule';
import RedisConfig from '../../config/RedisConfig';
import AMQPProviderModule from '../../shared/providers/AMQPProvider/AMQPProviderModule';
import AddressesCacheVerifierService from './services/AddressesCacheVerifierService';

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
    AddressesCacheVerifierService,
  ],
  exports: [TypeOrmModule],
})
export default class AddressesModule {}
