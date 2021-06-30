import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import redisConfig from '@config/redis.config';
import typeormConfig from '@config/typeorm.config';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({ cache: true, isGlobal: true }),
    CacheModule.register(redisConfig),
    TypeOrmModule.forRoot(typeormConfig),
  ],
  exports: [TypeOrmModule, ConfigModule],
})
export default class FeaturesModule {}
