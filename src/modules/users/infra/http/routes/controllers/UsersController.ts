import {
  Body,
  Controller,
  Patch,
  Post,
  Param,
  UseFilters,
  Get,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ErrorException from '@shared/exceptions/ErrorException';
import { Cache } from 'cache-manager-redis-store';
import { User } from '@fireheet/entities';
import CreateUserService from '@modules/users/services/CreateUserService';
import ValidationException from '@shared/exceptions/ValidationException';
import CreateUserDTO from '../../../../dtos/CreateUserDTO';
import UpdateUserService from '../../../../services/UpdateUserService';
import ListUserService from '../../../../services/ListUserService';
import UpdateUserDTO from '../../../../dtos/UpdateUserDTO';

@ApiTags('Users Routes')
@Controller('users')
@UseFilters(ErrorException, ValidationException)
export default class UsersController {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
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

    const cachedUser = await this.cacheManager.get<User>(`${id}-user`);

    if (!cachedUser) {
      user = await this.listUser.execute(id);

      await this.cacheManager.set(`${id}-user`, user);

      return user;
    }

    return cachedUser;
  }
}
