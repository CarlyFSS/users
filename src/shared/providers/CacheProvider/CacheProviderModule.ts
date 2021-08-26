import { CacheModule, Module } from '@nestjs/common';
import RedisConfig from '../../../config/RedisConfig';
import AddressesCacheProvider from './implementations/addresses/AddressesCacheProvider';
import RolesCacheProvider from './implementations/roles/RolesCacheProvider';
import UsersCacheProvider from './implementations/users/UsersCacheProvider';

@Module({
  imports: [CacheModule.register(RedisConfig)],
  providers: [UsersCacheProvider, RolesCacheProvider, AddressesCacheProvider],
  exports: [UsersCacheProvider, RolesCacheProvider, AddressesCacheProvider],
})
export default class CacheProviderModule {}
