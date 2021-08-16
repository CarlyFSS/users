import { BadRequestException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import RolesRepository from '../../roles/infra/typeorm/repositories/RolesRepository';
import FakeRolesRepository from '../../roles/repositories/fakes/FakeRolesRepository';
import ListRoleByNameService from '../../roles/services/ListRoleByNameService';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import FakeBcryptHashProvider from '../providers/HashProvider/fakes/FakeBcryptHashProvider';
import BcryptHashProvider from '../providers/HashProvider/implementations/BcryptHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import ListUserService from './ListUserService';

let listUserService: ListUserService;
let createUserService: CreateUserService;

const userModel = {
  name: 'jon',
  email: 'email@email.com',
  password: '123',
  document_number: '123',
  role_id: '123',
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
        CreateUserService,
        ListUserService,
        ListRoleByNameService,
        {
          provide: BcryptHashProvider,
          useValue: new FakeBcryptHashProvider(),
        },
      ],
    }).compile();

    listUserService = module.get<ListUserService>(ListUserService);
    createUserService = module.get<CreateUserService>(CreateUserService);
  });

  it('should be able to list a user with a valid id', async () => {
    const user = await createUserService.execute(userModel);

    const userID = await listUserService.execute(user.id);

    expect(userID).toHaveProperty('id');
  });

  it('should not be able to list a user with a invalid id', async () => {
    await expect(listUserService.execute('invalid')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
