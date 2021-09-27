import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller('/healthz')
export default class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly typeorm: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([() => this.typeorm.pingCheck('Database')]);
  }
}
