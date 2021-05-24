import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import TenantsRepository from '../infra/typeorm/repositories/tenants.repository';
import FakeTenantsRepository from '../repositories/fakes/fake-tenants.repository';
import CreateTenantService from './create-tenant.service';

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

  it('should be able create an tenant with a valid name', async () => {
    const tenant = await createTenantService.execute({ name: 'jon' });

    expect(tenant).toHaveProperty('id');
  });

  it('should not be able create an tenant with a alredy existing one', async () => {
    await createTenantService.execute({ name: 'jon' });

    await expect(
      createTenantService.execute({ name: 'jon' }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
