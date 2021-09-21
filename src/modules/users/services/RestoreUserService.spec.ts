import { BadRequestException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import RolesRepository from '../../roles/infra/typeorm/repositories/RolesRepository';
import FakeRolesRepository from '../../roles/repositories/fakes/FakeRolesRepository';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import UsersMockFactory from '../models/mocks/UsersMockFactory';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import RestoreUserService from './RestoreUserService';

const mockFactory = UsersMockFactory();

let restoreUser: RestoreUserService;
let usersRepository: UsersRepository;

describe('RestoreUserService', () => {
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
        RestoreUserService,
      ],
    }).compile();

    restoreUser = module.get<RestoreUserService>(RestoreUserService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be able to restore an already deleted user', async () => {
    const user = await usersRepository.create(mockFactory.createUserDTO());

    await usersRepository.delete(user.id);

    expect(user.deleted_at).not.toBe(null);

    const activatedUser = await restoreUser.execute(user.id);

    expect(activatedUser.deleted_at).toBe(null);
  });

  it('should not be able to restore a non existing user', async () => {
    await expect(restoreUser.execute('123')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('should not be able to restore a already active user', async () => {
    const user = await usersRepository.create(mockFactory.createUserDTO());

    await expect(restoreUser.execute(user.id)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
