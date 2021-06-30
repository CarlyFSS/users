import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';

const result = dotenv.config();

const typeormConfig: TypeOrmModuleOptions = {
  type: (`${result.parsed.ORM_TYPE}` as 'postgres') || 'postgres',
  host: `${result.parsed.ORM_HOST}` || 'localhost',
  port: +result.parsed.ORM_PORT || 5432,
  username: `${result.parsed.ORM_USERNAME}` || 'postgres',
  password: `${result.parsed.ORM_PASSWORD}` || 'postgres',
  database: `${result.parsed.ORM_DATABASE}` || 'postgres',
  entities: ['../modules/**/infra/typeorm/entities/*.ts'],
  autoLoadEntities: true,
};

export default typeormConfig;
