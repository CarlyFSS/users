import { BadRequestException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import AddressesRepository from '../../addresses/infra/typeorm/repositories/AddressesRepository';
import FakeAddressesRepository from '../../addresses/repositories/fakes/FakeAddressesRepository';
import RolesRepository from '../../roles/infra/typeorm/repositories/RolesRepository';
import FakeRolesRepository from '../../roles/repositories/fakes/FakeRolesRepository';
import ListRoleByNameService from '../../roles/services/ListRoleByNameService';
import CreateUserDTO from '../dtos/CreateUserDTO';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import FakeBcryptHashProvider from '../providers/HashProvider/fakes/FakeBcryptHashProvider';
import BcryptHashProvider from '../providers/HashProvider/implementations/BcryptHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import ListUserService from './ListUserService';

let listUser: ListUserService;
let createUser: CreateUserService;

const userModel: CreateUserDTO = {
  name: 'jon',
  email: 'email@email.com',
  password: '123',
  document_number: '123',
  birthdate: new Date(),
};

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
    const user = await createUser.execute(userModel);

    const userID = await listUser.execute(user.id);

    expect(userID).toHaveProperty('id');
  });

  it('should not be able to list a user with a invalid id', async () => {
    await expect(listUser.execute('invalid')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
