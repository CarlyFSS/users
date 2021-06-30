import { CacheModuleOptions } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import dotenv from 'dotenv';

const result = dotenv.config();

const redisConfig: CacheModuleOptions = {
  ttl: +result.parsed.REDIS_DEFAULT_TTL,
  store: redisStore,
  auth_pass: result.parsed.REDIS_PASSWORD,
  host: result.parsed.REDIS_HOST,
  port: result.parsed.REDIS_PORT,
};

export default redisConfig;
