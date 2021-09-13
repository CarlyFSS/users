import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Phone } from '@fireheet/entities';
import CacheProviderModule from '../../shared/providers/CacheProvider/CacheProviderModule';
import RedisConfig from '../../config/RedisConfig';
import AMQPProviderModule from '../../shared/providers/AMQPProvider/AMQPProviderModule';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Phone]),
    CacheModule.register(RedisConfig),
    AMQPProviderModule,
    CacheProviderModule,
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export default class PhonesModule {}
