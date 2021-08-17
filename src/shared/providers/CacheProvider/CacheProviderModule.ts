import { CacheModule, Module } from '@nestjs/common';
import RedisConfig from '../../../config/RedisConfig';
import RolesCacheProvider from './implementations/roles/RolesCacheProvider';
import UsersCacheProvider from './implementations/users/UsersCacheProvider';

@Module({
  imports: [CacheModule.register(RedisConfig)],
  providers: [UsersCacheProvider, RolesCacheProvider],
  exports: [UsersCacheProvider, RolesCacheProvider],
})
export default class CacheProviderModule {}
