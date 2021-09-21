import { BadRequestException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import AddressesRepository from '../../addresses/infra/typeorm/repositories/AddressesRepository';
import FakeAddressesRepository from '../../addresses/repositories/fakes/FakeAddressesRepository';
import RolesRepository from '../../roles/infra/typeorm/repositories/RolesRepository';
import FakeRolesRepository from '../../roles/repositories/fakes/FakeRolesRepository';
import ListRoleByNameService from '../../roles/services/ListRoleByNameService';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import UsersMockFactory from '../models/mocks/UsersMockFactory';
import FakeBcryptHashProvider from '../providers/HashProvider/fakes/FakeBcryptHashProvider';
import BcryptHashProvider from '../providers/HashProvider/implementations/BcryptHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import ListUserService from './ListUserService';

let listUser: ListUserService;
let createUser: CreateUserService;

describe('ListUserService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventEmitter2,
        {
          provide: RolesRepository,
          useValue: new FakeRolesRepository(),
        },
        {
          provide: UsersRepository,
          useValue: new FakeUsersRepository(),
        },
        {
          provide: AddressesRepository,
          useValue: new FakeAddressesRepository(),
        },
        CreateUserService,
        ListUserService,
        ListRoleByNameService,
        {
          provide: BcryptHashProvider,
          useValue: new FakeBcryptHashProvider(),
        },
      ],
    }).compile();

    listUser = module.get<ListUserService>(ListUserService);
    createUser = module.get<CreateUserService>(CreateUserService);
  });

  it('should be able to list a user with a valid id', async () => {
    const createdUser = await createUser.execute(
      UsersMockFactory().createUserDTO(),
    );

    const listedUser = await listUser.execute(createdUser.id);

    expect(listedUser).toHaveProperty('id');
  });

  it('should not be able to list a user with a invalid id', async () => {
    await expect(listUser.execute('invalid')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
