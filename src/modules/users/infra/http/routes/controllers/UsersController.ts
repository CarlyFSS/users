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
  Delete,
  Query,
} from '@nestjs/common';
import ErrorException from '@shared/exceptions/ErrorException';
import CreateUserService from '@modules/users/services/CreateUserService';
import ValidationException from '@shared/exceptions/ValidationException';
import { User } from '@fireheet/entities/typeorm/users';
import CreateUserDTO from '../../../../models/dtos/CreateUserDTO';
import UpdateUserService from '../../../../services/UpdateUserService';
import UpdateUserDTO from '../../../../models/dtos/UpdateUserDTO';
import DocumentValidationPipe from '../../pipes/DocumentValidationPipe';
import BirthdateValidationPipe from '../../pipes/BirthdateValidationPipe';
import UserCacheVerifierService from '../../../../services/UsersCacheVerifierService';
import DeleteUserService from '../../../../services/DeleteUserService';
import RestoreUserService from '../../../../services/RestoreUserService';
import UUIDValidationInterceptor from '../../../../../../shared/infra/http/interceptor/UUIDValidationInterceptor';

@Controller()
@UseFilters(ErrorException, ValidationException)
@UseInterceptors(ClassSerializerInterceptor, UUIDValidationInterceptor)
export default class UsersController {
  constructor(
    private readonly createUser: CreateUserService,
    private readonly updateUser: UpdateUserService,
    private readonly deleteUser: DeleteUserService,
    private readonly restoreUser: RestoreUserService,
    private readonly userCacheVerifier: UserCacheVerifierService,
  ) {}

  @Post()
  @UsePipes(DocumentValidationPipe, BirthdateValidationPipe)
  async create(@Body() data: CreateUserDTO): Promise<Partial<User>> {
    return this.createUser.execute(data);
  }

  @Patch(':user_id')
  async update(
    @Param('user_id')
    user_id: string,
    @Query('role_id') role_id: string,
    @Body() data: UpdateUserDTO,
  ): Promise<Partial<User>> {
    return this.updateUser.execute(user_id, data, role_id);
  }

  @Get(':user_id')
  async show(
    @Param('user_id') user_id: string,
  ): Promise<Partial<User> | undefined> {
    return this.userCacheVerifier.execute(user_id);
  }

  @Delete(':user_id')
  async delete(
    @Param('user_id') user_id: string,
  ): Promise<Partial<User> | undefined> {
    return this.deleteUser.execute(user_id);
  }

  @Patch(':user_id/restore')
  async activate(
    @Param('user_id') user_id: string,
  ): Promise<Partial<User> | undefined> {
    return this.restoreUser.execute(user_id);
  }
}
