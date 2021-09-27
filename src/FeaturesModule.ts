import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({ cache: true, isGlobal: true }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get('REQUESTS_THROTTLE_TTL'),
        limit: config.get('REQUESTS_THROTTLE_LIMIT'),
      }),
    }),
  ],
  exports: [ConfigModule],
})
export default class FeaturesModule {}
