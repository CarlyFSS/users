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

let createUserService: CreateUserService;

const userModel = {
  name: 'jon',
  email: 'email@email.com',
  password: '123',
  document_number: '123',
  role_id: '123',
  birthdate: new Date(),
};

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
        CreateUserService,
        ListRoleByNameService,
        {
          provide: BcryptHashProvider,
          useValue: new FakeBcryptHashProvider(),
        },
      ],
    }).compile();

    createUserService = module.get<CreateUserService>(CreateUserService);
  });

  it('should be able create a user with a valid credentials', async () => {
    const user = await createUserService.execute(userModel);

    expect(user).toHaveProperty('id');
  });

  it('should not be able create a user with same email', async () => {
    await createUserService.execute(userModel);

    const user2 = userModel;
    user2.document_number = '1234';

    await expect(createUserService.execute(user2)).rejects.toBeInstanceOf(
      ForbiddenException,
    );
  });

  it('should not be able create a user with same document number', async () => {
    const user2 = userModel;
    user2.email = 'email2@email.com';

    await createUserService.execute(userModel);

    await expect(createUserService.execute(user2)).rejects.toBeInstanceOf(
      ForbiddenException,
    );
  });

  it('should be able create a user without informing the role', async () => {
    delete userModel.role_id;

    const user = await createUserService.execute(userModel);

    expect(user).toHaveProperty('id');
  });
});
