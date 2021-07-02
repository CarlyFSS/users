import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let createUserService: CreateUserService;
let usersRepository: UsersRepository;

describe('CreateUserService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UsersRepository,
          useValue: new FakeUsersRepository(),
        },
        CreateUserService,
      ],
    }).compile();

    createUserService = module.get<CreateUserService>(CreateUserService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be able create a tenant with a valid name', async () => {
    const tenant = await createTenantService.execute({ name: 'jon' });

    expect(tenant).toHaveProperty('id');
  });

  it('should not be able create a tenant with a already existing one', async () => {
    await createTenantService.execute({ name: 'jon' });

    await expect(
      createTenantService.execute({ name: 'jon' }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
