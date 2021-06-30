import { Module } from '@nestjs/common';
import TenantsModule from '@modules/tenants/TenantsModule';
import { TerminusModule } from '@nestjs/terminus';
import HealthController from './modules/health/HealthController';
import RolesModule from './modules/roles/RolesModule';

@Module({
  imports: [TerminusModule, TenantsModule, RolesModule],
  providers: [],
  controllers: [HealthController],
})
export default class ControlModule {}
