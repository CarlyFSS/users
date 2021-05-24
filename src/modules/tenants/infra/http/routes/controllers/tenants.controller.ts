import CreateTenantDTO from '@modules/tenants/dtos/create-tenant.dto';
import CreateTenantService from '@modules/tenants/services/create-tenant.service';
import UpdateTenantService from '@modules/tenants/services/update-tenant.service';
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
import ErrorException from '@shared/exceptions/error.exception';
import ListTenantService from '../../../../services/list-tenant.service';
import Tenant from '../../../typeorm/entities/tenant.entity';

@ApiTags('Tenants Routes')
@Controller('tenants')
@UseFilters(ErrorException)
export default class TenantsController {
  constructor(
    private createTenant: CreateTenantService,
    private updateTenant: UpdateTenantService,
    private listTenant: ListTenantService,
  ) {}

  @Post()
  async create(@Body() data: CreateTenantDTO): Promise<Tenant> {
    const tenant = await this.createTenant.execute(data);

    return tenant;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body('name') name: string,
  ): Promise<Tenant> {
    const tenant = await this.updateTenant.execute({ id, name });

    return tenant;
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<Tenant> {
    const tenant = await this.listTenant.execute(id);

    return tenant;
  }
}
