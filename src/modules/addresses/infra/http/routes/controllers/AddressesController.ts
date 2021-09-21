import {
  Body,
  Controller,
  Patch,
  Post,
  Param,
  UseFilters,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ErrorException from '@shared/exceptions/ErrorException';
import { Address } from '@fireheet/entities';
import ValidationException from '@shared/exceptions/ValidationException';
import CreateAddressService from '@modules/addresses/services/CreateAddressService';
import CreateAddressDTO from '@modules/addresses/models/dtos/CreateAddressDTO';
import UpdateAddressDTO from '@modules/addresses/models/dtos/UpdateAddressDTO';
import { Delete, Query } from '@nestjs/common/decorators/http';
import UpdateAddressService from '../../../../services/UpdateAddressService';
import DeleteAddressService from '../../../../services/DeleteAddressService';
import AddressesCacheVerifierService from '../../../../services/AddressesCacheVerifierService';
import UUIDValidationInterceptor from '../../../../../../shared/infra/http/pipes/UUIDValidationInterceptor';
import AddressValidatorInterceptor from '../../interceptors/AddressValidatorInterceptor';

@ApiTags('Addresses Routes')
@Controller()
@UseFilters(ErrorException, ValidationException)
@UseInterceptors(ClassSerializerInterceptor, UUIDValidationInterceptor)
export default class AddressesController {
  constructor(
    private readonly createAddress: CreateAddressService,
    private readonly updateAddress: UpdateAddressService,
    private readonly deleteAddress: DeleteAddressService,
    private readonly addressesCacheVerifier: AddressesCacheVerifierService,
  ) {}

  @Post(':user_id')
  @UseInterceptors(AddressValidatorInterceptor)
  async create(
    @Param('user_id')
    user_id: string,
    @Body() data: CreateAddressDTO,
  ): Promise<Address> {
    return this.createAddress.execute(user_id, data);
  }

  @Patch(':user_id')
  @UseInterceptors(AddressValidatorInterceptor)
  async update(
    @Param('user_id')
    user_id: string,
    @Query('address_id') address_id: string,
    @Body() data: UpdateAddressDTO,
  ): Promise<Address> {
    return this.updateAddress.execute(user_id, address_id, data);
  }

  @Get(':user_id')
  async show(
    @Param('user_id') user_id: string,
    @Query('address_id') address_id: string,
  ): Promise<Address | Address[]> {
    return this.addressesCacheVerifier.execute(user_id, address_id);
  }

  @Delete(':user_id')
  async delete(
    @Param('user_id') user_id: string,
    @Query('address_id') address_id: string,
  ): Promise<Address> {
    return this.deleteAddress.execute(user_id, address_id);
  }
}
