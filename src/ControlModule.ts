import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import AddressesModule from './modules/addresses/AddressesModule';
import HealthController from './modules/health/HealthController';
import RolesModule from './modules/roles/RolesModule';
import UsersModule from './modules/users/UsersModule';

@Module({
  imports: [TerminusModule, RolesModule, UsersModule, AddressesModule],
  providers: [],
  controllers: [HealthController],
})
export default class ControlModule {}
