import { CacheModuleOptions } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import dotenv from 'dotenv';

const result = dotenv.config().parsed;

const RedisConfig: CacheModuleOptions = {
  ttl: +`${result?.REDIS_DEFAULT_TTL}`,
  store: redisStore,
  auth_pass: result?.REDIS_PASSWORD,
  host: result?.REDIS_HOST,
  port: result?.REDIS_PORT,
};

export default RedisConfig;
