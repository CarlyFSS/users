import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import AddressesModule from './modules/addresses/AddressesModule';
import HealthController from './modules/health/infra/http/routes/HealthController';
import RolesModule from './modules/roles/RolesModule';
import UsersModule from './modules/users/UsersModule';
import CacheProviderModule from './shared/providers/CacheProvider/CacheProviderModule';

@Module({
  imports: [
    TerminusModule,
    RolesModule,
    UsersModule,
    AddressesModule,
    CacheProviderModule,
  ],
  providers: [],
  controllers: [HealthController],
})
export default class ControlModule {}
