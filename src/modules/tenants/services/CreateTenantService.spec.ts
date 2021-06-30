import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import TenantsRepository from '../infra/typeorm/repositories/TenantsRepository';
import FakeTenantsRepository from '../repositories/fakes/FakeTenantsRepository';
import CreateTenantService from './CreateTenantService';

let createTenantService: CreateTenantService;
let tenantsRepository: TenantsRepository;

describe('CreateTenantService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TenantsRepository,
          useValue: new FakeTenantsRepository(),
        },
        CreateTenantService,
      ],
    }).compile();

    createTenantService = module.get<CreateTenantService>(CreateTenantService);
    tenantsRepository = module.get<TenantsRepository>(TenantsRepository);
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
