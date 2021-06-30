import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import RolesRepository from '../infra/typeorm/repositories/RolesRepository';
import FakeRolesRepository from '../repositories/fakes/FakeTenantsRepository';
import ListRoleService from './ListRoleService';

let listRoleService: ListRoleService;
let rolesRepository: RolesRepository;

describe('ListTenantService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RolesRepository,
          useValue: new FakeRolesRepository(),
        },
        ListRoleService,
      ],
    }).compile();

    listRoleService = module.get<ListRoleService>(ListRoleService);
    rolesRepository = module.get<RolesRepository>(RolesRepository);
  });

  it('should be able to list a tenant with a valid id', async () => {
    const tenantId = await listRoleService.execute('1');

    expect(tenantId).toHaveProperty('id');
  });

  it('should not be able to list a tenant with a invalid id', async () => {
    await expect(listRoleService.execute('invalid')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
