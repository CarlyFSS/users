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
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import ErrorException from '@shared/exceptions/ErrorException';
import { logError } from '../../../../../../shared/helper/AppLogger';
import ListTenantService from '../../../../services/ListTenantService';
import Tenant from '../../../typeorm/entities/Tenant';

@ApiTags('Tenants Routes')
@Controller('tenants')
@UseFilters(ErrorException)
export default class TenantsController {
  constructor(
    private readonly createTenant: CreateTenantService,
    private readonly updateTenant: UpdateTenantService,
    private readonly listTenant: ListTenantService,
    @Inject('TENANTS_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  @Post()
  async create(@Body() data: CreateTenantDTO): Promise<Tenant> {
    this.client.emit<string>('tenants', 'test');

    return this.createTenant.execute(data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body('name') name: string,
  ): Promise<Tenant> {
    return this.updateTenant.execute({ id, name });
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<Tenant> {
    try {
      const t = this.client.emit<string>('tenants', 'test');
    } catch (error) {
      logError('error', error);
    }

    return this.listTenant.execute(id);
  }
}
