import { Module } from '@nestjs/common';
import TenantsModule from '@modules/tenants/TenantsModule';
import { TerminusModule } from '@nestjs/terminus';
import HealthController from './modules/health/HealthController';

@Module({
  imports: [TerminusModule, TenantsModule],
  providers: [],
  controllers: [HealthController],
})
export default class ControlModule {}
