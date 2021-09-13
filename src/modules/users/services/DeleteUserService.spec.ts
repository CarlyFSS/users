import { User } from '@fireheet/entities';
import { BadRequestException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import RolesRepository from '../../roles/infra/typeorm/repositories/RolesRepository';
import FakeRolesRepository from '../../roles/repositories/fakes/FakeRolesRepository';
import CreateUserDTO from '../dtos/CreateUserDTO';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import DeleteUserService from './DeleteUserService';

let deleteUser: DeleteUserService;
let usersRepository: UsersRepository;
let user: User;

const userModel: CreateUserDTO = {
  name: 'jon',
  email: 'email1',
  password: '123',
  document_number: '123',
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
        DeleteUserService,
      ],
    }).compile();

    deleteUser = module.get<DeleteUserService>(DeleteUserService);
    usersRepository = module.get<UsersRepository>(UsersRepository);

    user = await usersRepository.create(userModel);
  });

  it('should be able to delete an already activated user', async () => {
    const deletedUser = await deleteUser.execute(user.id);

    expect(deletedUser.deleted_at).not.toBe(null);
  });

  it('should not be able to delete a non existing user', async () => {
    await expect(deleteUser.execute('123')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('should not be able to delete a already deleted user', async () => {
    await deleteUser.execute(user.id);

    await expect(deleteUser.execute(user.id)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
