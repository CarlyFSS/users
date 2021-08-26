import { CacheModule, Module } from '@nestjs/common';
import RedisConfig from '../../../config/RedisConfig';
import RedisCacheProvider from './implementations/RedisCacheProvider';

@Module({
  imports: [CacheModule.register(RedisConfig)],
  providers: [RedisCacheProvider],
  exports: [RedisCacheProvider],
})
export default class CacheProviderModule {}
