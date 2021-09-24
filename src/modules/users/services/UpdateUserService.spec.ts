import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import FakeCacheProvider from '../../../shared/providers/CacheProvider/fakes/FakeCacheProvider';
import AddressesRepository from '../../addresses/infra/typeorm/repositories/AddressesRepository';
import FakeAddressesRepository from '../../addresses/repositories/fakes/FakeAddressesRepository';
import RolesRepository from '../../roles/infra/typeorm/repositories/RolesRepository';
import FakeRolesRepository from '../../roles/repositories/fakes/FakeRolesRepository';
import ListRoleByNameService from '../../roles/services/ListRoleByNameService';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import UsersMockFactory from '../models/mocks/UsersMockFactory';
import UsersCacheProvider from '../providers/CacheProvider/implementations/UsersCacheProvider';
import FakeBcryptHashProvider from '../providers/HashProvider/fakes/FakeBcryptHashProvider';
import BcryptHashProvider from '../providers/HashProvider/implementations/BcryptHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import UpdateUserService from './UpdateUserService';

const mockFactory = UsersMockFactory();

let updateUser: UpdateUserService;
let createUser: CreateUserService;

describe('UpdateUserService', () => {
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
        UpdateUserService,
        CreateUserService,
        ListRoleByNameService,
        {
          provide: UsersCacheProvider,
          useValue: new FakeCacheProvider(),
        },
        {
          provide: BcryptHashProvider,
          useValue: new FakeBcryptHashProvider(),
        },
      ],
    }).compile();

    updateUser = module.get<UpdateUserService>(UpdateUserService);
    createUser = module.get<CreateUserService>(CreateUserService);
  });

  it('should be able update a user with a valid id', async () => {
    const user = await createUser.execute(mockFactory.createUserDTO());

    if (user.id) {
      const updatedUser = await updateUser.execute(user.id, {
        email: 'test',
        name: 'jon',
      });

      expect(updatedUser.email).toEqual('test');
      expect(updatedUser.name).toEqual('jon');
    }
  });

  it('should not be able update a user with a invalid id', async () => {
    await expect(
      updateUser.execute('123', {
        email: 'test',
        name: 'jon',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should not be able update a user email to a already existing one', async () => {
    const user = await createUser.execute(mockFactory.createUserDTO());

    await createUser.execute(mockFactory.createUserDTO({ email: 'test' }));

    if (user.id) {
      await expect(
        updateUser.execute(user.id, {
          email: 'test',
        }),
      ).rejects.toBeInstanceOf(ForbiddenException);
    }
  });
});
