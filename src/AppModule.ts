import { Module } from '@nestjs/common';
import TenantsModule from '@modules/tenants/TenantsModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminusModule } from '@nestjs/terminus';
import HealthController from './modules/health/HealthController';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.ORM_HOST || 'localhost',
      port: +process.env.ORM_PORT || 5432,
      username: process.env.ORM_USERNAME || 'postgres',
      password: process.env.ORM_PASSWORD || '816bea9343fadad7c2f751e4da54743a',
      database: process.env.ORM_DATABASE || 'users',
      entities: ['../modules/**/infra/typeorm/entities/*.ts'],
      autoLoadEntities: true,
    }),
    TerminusModule,
    TenantsModule,
  ],
  controllers: [HealthController],
})
export default class AppModule {}
