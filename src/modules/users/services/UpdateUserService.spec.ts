import { BadRequestException, ForbiddenException } from '@nestjs/common';
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
import UpdateUserService from './UpdateUserService';

let updateUser: UpdateUserService;
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
        UpdateUserService,
        CreateUserService,
        ListRoleByNameService,
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
    const user = await createUser.execute(userModel);

    const updatedUser = await updateUser.execute(user.id, {
      email: 'email2',
      name: 'jon doe',
      password: '1234',
    });

    expect(updatedUser.email).toEqual('email2');
    expect(updatedUser.name).toEqual('jon doe');
  });

  it('should not be able update a user with a invalid id', async () => {
    await expect(
      updateUser.execute('123', {
        email: 'email2',
        name: 'jon doe',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should not be able update a user email to a already existing one', async () => {
    const user = await createUser.execute(userModel);

    await createUser.execute(userModel2);

    await expect(
      updateUser.execute(user.id, {
        email: 'email2',
      }),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });
});