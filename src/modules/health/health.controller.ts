import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@ApiTags('Health Routes')
@Controller('/healthz')
export default class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private typeorm: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([() => this.typeorm.pingCheck('Database')]);
  }
}
