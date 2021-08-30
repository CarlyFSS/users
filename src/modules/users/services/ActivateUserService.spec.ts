import { User } from '@fireheet/entities';
import { BadRequestException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import RolesRepository from '../../roles/infra/typeorm/repositories/RolesRepository';
import FakeRolesRepository from '../../roles/repositories/fakes/FakeRolesRepository';
import CreateUserDTO from '../dtos/CreateUserDTO';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ActivateUserService from './ActivateUserService';

let activateUser: ActivateUserService;
let usersRepository: UsersRepository;
let user: User;

const userModel: CreateUserDTO = {
  name: 'jon',
  email: 'email1',
  password: '123',
  document_number: '123',
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
        ActivateUserService,
      ],
    }).compile();

    activateUser = module.get<ActivateUserService>(ActivateUserService);
    usersRepository = module.get<UsersRepository>(UsersRepository);

    user = await usersRepository.create(userModel);
  });

  it('should be able to activate an already deactivated user', async () => {
    await usersRepository.deactivate(user.id);

    expect(user.deleted_at).not.toBe(null);

    const activatedUser = await activateUser.execute(user.id);

    expect(activatedUser.deleted_at).toBe(null);
  });

  it('should not be able to activate a non existing user', async () => {
    await expect(activateUser.execute('123')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('should not be able to activate a already activated user', async () => {
    await expect(activateUser.execute(user.id)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
