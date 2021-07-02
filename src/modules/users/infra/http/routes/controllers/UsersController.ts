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
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cache } from 'cache-manager-redis-store';
import User from '@fireheet/entities/typeorm/User';
import CreateUserService from '@modules/users/services/CreateUserService';
import CreateUserDTO from '../../../../dtos/CreateUserDTO';
import UpdateUserService from '../../../../services/UpdateUserService';
import BcryptHashProvider from '../../../../providers/HashProvider/implementations/BcryptHashProvider';

@ApiTags('Users Routes')
@Controller('users')
@UseFilters(ErrorException)
export default class UsersController {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly eventEmitter: EventEmitter2,
    private readonly createUser: CreateUserService,
    private readonly updateUser: UpdateUserService,
    private readonly hashProvider: BcryptHashProvider,
  ) {}

  @Post()
  async create(@Body() data: CreateUserDTO): Promise<User> {
    const user = await this.createUser.execute(data);

    delete user.password;

    return user;
  }

  @Patch(':id')
  async update(
    @Param('id')
    id: string,
    @Body('name') name: string,
  ): Promise<User> {
    // const user = await this.updateUser.execute();

    // return user;

    return new User();
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<User> {
    // let tenant: Tenant;
    // const cachedTenant = await this.cacheManager.get<Tenant>(`${id}-tenant`);
    // if (!cachedTenant) {
    //   tenant = await this.listTenant.execute(id);
    //   await this.cacheManager.set(`${id}-tenant`, tenant);
    //   return tenant;
    // }
    // return cachedTenant;

    return new User();
  }
}
