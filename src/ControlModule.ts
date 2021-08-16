import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import HealthController from './modules/health/HealthController';
import RolesModule from './modules/roles/RolesModule';
import UsersModule from './modules/users/UsersModule';

@Module({
  imports: [TerminusModule, RolesModule, UsersModule],
  providers: [],
  controllers: [HealthController],
})
export default class ControlModule {}
