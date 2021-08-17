import { ForbiddenException } from '@nestjs/common';
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

let createUser: CreateUserService;

const userModel = {
  name: 'jon',
  email: 'email1',
  password: '123',
  document_number: '123',
  role_id: '123',
  birthdate: new Date(),
};

const userModel2 = {
  name: 'jon',
  email: 'email2',
  password: '123',
  document_number: '321',
  role_id: '123',
  birthdate: new Date(),
};

describe('CreateUserService', () => {
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
        ListRoleByNameService,
        {
          provide: BcryptHashProvider,
          useValue: new FakeBcryptHashProvider(),
        },
      ],
    }).compile();

    createUser = module.get<CreateUserService>(CreateUserService);
  });

  it('should be able create a user with a valid credentials', async () => {
    const user = await createUser.execute(userModel);

    expect(user).toHaveProperty('id');
  });

  it('should not be able create a user with same email', async () => {
    await createUser.execute(userModel);

    userModel2.email = userModel.email;

    await expect(createUser.execute(userModel2)).rejects.toBeInstanceOf(
      ForbiddenException,
    );
  });

  it('should not be able create a user with same document number', async () => {
    await createUser.execute(userModel);

    userModel.email = '123';

    await expect(createUser.execute(userModel)).rejects.toBeInstanceOf(
      ForbiddenException,
    );
  });

  it('should be able create a user without informing the role', async () => {
    delete userModel.role_id;

    const user = await createUser.execute(userModel);

    expect(user).toHaveProperty('id');
  });
});
