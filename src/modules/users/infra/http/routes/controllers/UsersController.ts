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
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ErrorException from '@shared/exceptions/ErrorException';
import { User } from '@fireheet/entities';
import CreateUserService from '@modules/users/services/CreateUserService';
import ValidationException from '@shared/exceptions/ValidationException';
import CreateUserDTO from '../../../../dtos/CreateUserDTO';
import UpdateUserService from '../../../../services/UpdateUserService';
import UpdateUserDTO from '../../../../dtos/UpdateUserDTO';
import DocumentValidationPipe from '../../pipes/DocumentValidationPipe';
import BirthdateValidationPipe from '../../pipes/BirthdateValidationPipe';
import UserCacheVerifierService from '../../../../services/UsersCacheVerifierService';

@ApiTags('Users Routes')
@Controller()
@UseFilters(ErrorException, ValidationException)
@UseInterceptors(ClassSerializerInterceptor)
export default class UsersController {
  constructor(
    private readonly createUser: CreateUserService,
    private readonly updateUser: UpdateUserService,
    private readonly userCacheVerifier: UserCacheVerifierService,
  ) {}

  @Post()
  @UsePipes(DocumentValidationPipe, BirthdateValidationPipe)
  async create(@Body() data: CreateUserDTO): Promise<User> {
    return this.createUser.execute(data);
  }

  @Patch(':id')
  async update(
    @Param('id')
    id: string,
    @Body() data: UpdateUserDTO,
  ): Promise<User> {
    return this.updateUser.execute(id, data);
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<User> {
    return this.userCacheVerifier.execute(id);
  }
}
