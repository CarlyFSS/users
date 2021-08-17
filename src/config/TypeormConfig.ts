import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';

const result = dotenv.config();

const defaultPort = 5432;

const TypeormConfig: TypeOrmModuleOptions = {
  type: (`${result.parsed.ORM_TYPE}` as 'postgres') || 'postgres',
  host: `${result.parsed.ORM_HOST}` || 'localhost',
  port: +result.parsed.ORM_PORT || defaultPort,
  username: `${result.parsed.ORM_USERNAME}` || 'postgres',
  password: `${result.parsed.ORM_PASSWORD}` || 'postgres',
  database: `${result.parsed.ORM_DATABASE}` || 'postgres',
  entities: ['../modules/**/infra/typeorm/entities/*.ts'],
  autoLoadEntities: true,
  logging: false,
};

export default TypeormConfig;
