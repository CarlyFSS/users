import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import TenantsRepository from '../infra/typeorm/repositories/TenantsRepository';
import FakeTenantsRepository from '../repositories/fakes/FakeTenantsRepository';
import CreateTenantService from './CreateTenantService';
import ListTenantService from './ListTenantService';

let listTenantService: ListTenantService;
let createTenantService: CreateTenantService;
let tenantsRepository: TenantsRepository;

describe('ListTenantService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TenantsRepository,
          useValue: new FakeTenantsRepository(),
        },
        ListTenantService,
        CreateTenantService,
      ],
    }).compile();

    listTenantService = module.get<ListTenantService>(ListTenantService);
    tenantsRepository = module.get<TenantsRepository>(TenantsRepository);
    createTenantService = module.get<CreateTenantService>(CreateTenantService);
  });

  it('should be able to list an tenant with a valid id', async () => {
    const tenant = await createTenantService.execute({ name: 'jon' });

    const tenantId = await listTenantService.execute(tenant.id);

    expect(tenantId).toHaveProperty('id');
  });

  it('should not be able to list an tenant with a invalid id', async () => {
    await expect(listTenantService.execute('invalid')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
