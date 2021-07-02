import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import redisConfig from '@config/redis.config';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({ cache: true, isGlobal: true }),
    CacheModule.register(redisConfig),
  ],
  exports: [ConfigModule],
})
export default class FeaturesModule {}
