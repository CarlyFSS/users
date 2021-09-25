import { BadRequestException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import RolesRepository from '../../roles/infra/typeorm/repositories/RolesRepository';
import FakeRolesRepository from '../../roles/repositories/fakes/FakeRolesRepository';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import UsersMockFactory from '../factories/mocks/UsersMockFactory';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import DeleteUserService from './DeleteUserService';

const mockFactory = UsersMockFactory();

let deleteUser: DeleteUserService;
let usersRepository: UsersRepository;

describe('DeleteUserService', () => {
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
        DeleteUserService,
      ],
    }).compile();

    deleteUser = module.get<DeleteUserService>(DeleteUserService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be able to delete an already activated user', async () => {
    const user = await usersRepository.create(mockFactory.createUserDTO());

    const deletedUser = await deleteUser.execute(user.id);

    expect(deletedUser?.deleted_at).not.toBe(undefined);
  });

  it('should not be able to delete a non existing user', async () => {
    await expect(deleteUser.execute('123')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('should not be able to delete a already deleted user', async () => {
    const user = await usersRepository.create(mockFactory.createUserDTO());

    await deleteUser.execute(user.id);

    await expect(deleteUser.execute(user.id)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
