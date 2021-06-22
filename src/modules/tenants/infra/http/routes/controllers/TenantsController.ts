import CreateTenantDTO from '@modules/tenants/dtos/CreateTenantDTO';
import CreateTenantService from '@modules/tenants/services/CreateTenantService';
import UpdateTenantService from '@modules/tenants/services/UpdateTenantService';
import {
  Body,
  Controller,
  Patch,
  Post,
  Param,
  UseFilters,
  Get,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ErrorException from '@shared/exceptions/ErrorException';
import ListTenantService from '@modules/tenants/services/ListTenantService';
import Tenant from '@fireheet/entities/typeorm/Tenant';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@ApiTags('Tenants Routes')
@Controller('tenants')
@UseFilters(ErrorException)
export default class TenantsController {
  constructor(
    private readonly createTenant: CreateTenantService,
    private readonly updateTenant: UpdateTenantService,
    private readonly listTenant: ListTenantService,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  @Post()
  async create(@Body() data: CreateTenantDTO): Promise<Tenant> {
    const tenant = this.createTenant.execute(data);

    this.amqpConnection.publish(
      'users_exchange',
      'tenant',
      JSON.stringify(tenant),
    );

    return tenant;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body('name') name: string,
  ): Promise<Tenant> {
    const tenant = await this.updateTenant.execute({ id, name });

    this.amqpConnection.publish(
      'users_exchange',
      'tenant',
      JSON.stringify(tenant),
    );

    return tenant;
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<Tenant> {
    return this.listTenant.execute(id);
  }
}
