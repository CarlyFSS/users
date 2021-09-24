import { Role } from '@fireheet/entities/typeorm/users';
import { Test, TestingModule } from '@nestjs/testing';
import FakeCacheProvider from '../../../shared/providers/CacheProvider/fakes/FakeCacheProvider';
import RolesRepository from '../infra/typeorm/repositories/RolesRepository';
import RolesEnum from '../models/enums/RolesEnum';
import RolesMockFactory from '../models/mocks/RolesMockFactory';
import RolesCacheProvider from '../providers/CacheProvider/implementations/RolesCacheProvider';
import FakeRolesRepository from '../repositories/fakes/FakeRolesRepository';
import ListAllRolesService from './ListAllRolesService';
import ListRoleService from './ListRoleService';
import RolesCacheVerifierService from './RolesCacheVerifierService';

let rolesCacheVerifier: RolesCacheVerifierService;
let rolesCacheProvider: RolesCacheProvider;
let rolesRepository: RolesRepository;
let roles: Role;

describe('RolesCacheVerifierService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RolesRepository,
          useValue: new FakeRolesRepository(),
        },
        {
          provide: RolesCacheProvider,
          useValue: new FakeCacheProvider(),
        },
        RolesCacheVerifierService,
        ListRoleService,
        ListAllRolesService,
      ],
    }).compile();

    rolesCacheVerifier = module.get<RolesCacheVerifierService>(
      RolesCacheVerifierService,
    );

    rolesRepository = module.get<RolesRepository>(RolesRepository);

    rolesCacheProvider = module.get<RolesCacheProvider>(RolesCacheProvider);

    roles =
      (await rolesRepository.findByName(RolesEnum.CLIENT)) ||
      RolesMockFactory();
  });

  it('should be able to list a cached role', async () => {
    const cacheGet = jest.spyOn(rolesCacheProvider, 'get');
    const cacheStore = jest.spyOn(rolesCacheProvider, 'store');

    await rolesCacheVerifier.execute(roles.id);

    expect(cacheStore).toHaveBeenCalledTimes(1);

    cacheGet.mockResolvedValue(roles);

    await rolesCacheVerifier.execute(roles.id);

    expect(cacheGet).toHaveBeenCalledTimes(2);
  });

  it('should be able to list all cached roles', async () => {
    const cacheGet = jest.spyOn(rolesCacheProvider, 'get');
    const cacheStore = jest.spyOn(rolesCacheProvider, 'storeMany');

    await rolesCacheVerifier.execute();

    expect(cacheStore).toHaveBeenCalledTimes(1);

    await rolesCacheVerifier.execute();

    expect(cacheGet).toHaveBeenCalledTimes(2);
  });
});
