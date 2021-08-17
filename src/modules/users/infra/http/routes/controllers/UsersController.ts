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
import { User } from '@fireheet/entities';
import CreateUserService from '@modules/users/services/CreateUserService';
import ValidationException from '@shared/exceptions/ValidationException';
import UsersCacheProvider from '@shared/providers/CacheProvider/implementations/users/UsersCacheProvider';
import CreateUserDTO from '../../../../dtos/CreateUserDTO';
import UpdateUserService from '../../../../services/UpdateUserService';
import ListUserService from '../../../../services/ListUserService';
import UpdateUserDTO from '../../../../dtos/UpdateUserDTO';

@ApiTags('Users Routes')
@Controller('users')
@UseFilters(ErrorException, ValidationException)
@UseInterceptors(ClassSerializerInterceptor)
export default class UsersController {
  constructor(
    private readonly userCache: UsersCacheProvider,
    private readonly createUser: CreateUserService,
    private readonly listUser: ListUserService,
    private readonly updateUser: UpdateUserService,
  ) {}

  @Post()
  async create(@Body() data: CreateUserDTO): Promise<User> {
    const user = await this.createUser.execute(data);

    return user;
  }

  @Patch(':id')
  async update(
    @Param('id')
    id: string,
    @Body() data: UpdateUserDTO,
  ): Promise<User> {
    const user = await this.updateUser.execute(id, data);

    return user;
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<User> {
    let user: User;

    user = await this.userCache.get<User>(id);

    if (!user) {
      user = await this.listUser.execute(id);

      await this.userCache.store(id, user);
    }

    return user;
  }
}