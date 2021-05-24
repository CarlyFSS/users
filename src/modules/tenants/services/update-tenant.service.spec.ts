import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import TenantsRepository from '../infra/typeorm/repositories/tenants.repository';
import FakeTenantsRepository from '../repositories/fakes/fake-tenants.repository';
import UpdateTenantService from './update-tenant.service';

let updateTenantService: UpdateTenantService;
let tenantsRepository: TenantsRepository;

describe('UpdateTenantService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TenantsRepository,
          useValue: new FakeTenantsRepository(),
        },
        UpdateTenantService,
      ],
    }).compile();

    updateTenantService = module.get<UpdateTenantService>(UpdateTenantService);
    tenantsRepository = module.get<TenantsRepository>(TenantsRepository);
  });

  it('should be able to update an existing tenant', async () => {
    const tenant = await tenantsRepository.create({ name: 'jon' });

    await updateTenantService.execute({ id: tenant.id, name: 'jonathan' });

    expect(tenant).toHaveProperty('id');
  });

  it('should not update an non existing tenant', async () => {
    await expect(
      updateTenantService.execute({ id: 'undefined', name: 'jon' }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it("should not be able to update an tenant's name to an alredy existing one", async () => {
    const tenant = await tenantsRepository.create({ name: 'grace' });

    await tenantsRepository.create({ name: 'marry' });

    await expect(
      updateTenantService.execute({ id: tenant.id, name: 'marry' }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
