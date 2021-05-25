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
  ) {}

  @Post()
  async create(@Body() data: CreateTenantDTO): Promise<Tenant> {
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
    return this.listTenant.execute(id);
  }
}
