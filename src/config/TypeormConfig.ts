import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';

const result = dotenv.config()?.parsed;

const defaultPort = 5432;

const TypeormConfig: TypeOrmModuleOptions = {
  type: (`${result?.ORM_TYPE}` as 'postgres') || 'postgres',
  host: `${result?.ORM_HOST}` || 'localhost',
  port: +`${result?.ORM_PORT}` || defaultPort,
  username: `${result?.ORM_USERNAME}` || 'postgres',
  password: `${result?.ORM_PASSWORD}` || 'postgres',
  database: `${result?.ORM_DATABASE}` || 'postgres',
  entities: ['../modules/**/infra/typeorm/entities/*.ts'],
  autoLoadEntities: true,
  logging: false,
};

export default TypeormConfig;
