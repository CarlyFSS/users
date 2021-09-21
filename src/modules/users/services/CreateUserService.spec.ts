import { ForbiddenException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import RolesRepository from '../../roles/infra/typeorm/repositories/RolesRepository';
import FakeRolesRepository from '../../roles/repositories/fakes/FakeRolesRepository';
import ListRoleByNameService from '../../roles/services/ListRoleByNameService';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import UsersMockFactory from '../models/mocks/UsersMockFactory';
import FakeBcryptHashProvider from '../providers/HashProvider/fakes/FakeBcryptHashProvider';
import BcryptHashProvider from '../providers/HashProvider/implementations/BcryptHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

const mockFactory = UsersMockFactory();

let createUser: CreateUserService;
let usersRepository: UsersRepository;

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
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be able to create a user with a valid credentials', async () => {
    await createUser.execute(
      mockFactory.createUserDTO({ document_number: '123', role_id: '123' }),
    );

    const user = await usersRepository.findByDocument('123');

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a user with same email', async () => {
    await createUser.execute(mockFactory.createUserDTO({ email: 'test' }));

    const user = {
      ...mockFactory.createUserDTO({ email: 'test', document_number: '123' }),
    };

    await expect(createUser.execute(user)).rejects.toBeInstanceOf(
      ForbiddenException,
    );
  });

  it('should not be able to create a user with same document number', async () => {
    await createUser.execute(
      mockFactory.createUserDTO({ document_number: '123' }),
    );

    const user = {
      ...mockFactory.createUserDTO({ email: 'test', document_number: '123' }),
    };

    await expect(createUser.execute(user)).rejects.toBeInstanceOf(
      ForbiddenException,
    );
  });

  it('should be able to create a user without informing the role', async () => {
    const model = mockFactory.createUserDTO({ document_number: '123' });

    await createUser.execute(model);

    const user = await usersRepository.findByDocument('123');

    expect(user).toHaveProperty('id');
  });
});
