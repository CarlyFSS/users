import { CacheModule, Module } from '@nestjs/common';
import redisConfig from '../../../config/redis.config';
import RolesCacheProvider from './implementations/roles/RolesCacheProvider';
import UsersCacheProvider from './implementations/users/UsersCacheProvider';

@Module({
  imports: [CacheModule.register(redisConfig)],
  providers: [UsersCacheProvider, RolesCacheProvider],
  exports: [UsersCacheProvider, RolesCacheProvider],
})
export default class CacheProviderModule {}
