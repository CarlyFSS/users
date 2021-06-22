import { Module } from '@nestjs/common';
import TenantsModule from '@modules/tenants/TenantsModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import exchanges from '@config/exchanges.config';
import dotenv from 'dotenv';
import HealthController from './modules/health/HealthController';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, isGlobal: true }),
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
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges,
      uri: dotenv.config().parsed.AMQP_URI,
      connectionInitOptions: { wait: false },
    }),
    TenantsModule,
  ],
  providers: [],
  controllers: [HealthController],
  exports: [TypeOrmModule, ConfigModule, RabbitMQModule],
})
export default class AppModule {}
