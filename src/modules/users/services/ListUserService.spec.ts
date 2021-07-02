import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import ListUserService from './ListUserService';

let listUserService: ListUserService;
let createUserService: CreateUserService;
let usersRepository: UsersRepository;

describe('ListUserService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UsersRepository,
          useValue: new FakeUsersRepository(),
        },
        ListUserService,
        CreateUserService,
      ],
    }).compile();

    listUserService = module.get<ListUserService>(ListUserService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
    createUserService = module.get<CreateUserService>(CreateUserService);
  });

  it('should be able to list a tenant with a valid id', async () => {
    const tenant = await createUserService.execute({ name: 'jon' });

    const tenantId = await listUserService.execute(tenant.id);

    expect(tenantId).toHaveProperty('id');
  });

  it('should not be able to list a tenant with a invalid id', async () => {
    await expect(listUserService.execute('invalid')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
