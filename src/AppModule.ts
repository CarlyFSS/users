import { Module } from '@nestjs/common';
import TenantsModule from '@modules/tenants/TenantsModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminusModule } from '@nestjs/terminus';
import envConfig from '@config/env.config';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import HealthController from './modules/health/HealthController';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    TypeOrmModule.forRoot({
      type: (`${process.env.ORM_TYPE}` as 'postgres') || 'postgres',
      host: `${process.env.ORM_HOST}` || 'localhost',
      port: +process.env.ORM_PORT || 5432,
      username: `${process.env.ORM_USERNAME}` || 'postgres',
      password: `${process.env.ORM_PASSWORD}` || 'postgres',
      database: `${process.env.ORM_DATABASE}` || 'postgres',
      entities: ['../modules/**/infra/typeorm/entities/*.ts'],
      autoLoadEntities: true,
    }),
    TerminusModule,
    TenantsModule,
  ],
  controllers: [HealthController],
})
export default class AppModule {}
