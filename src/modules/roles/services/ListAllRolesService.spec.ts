import { Test, TestingModule } from '@nestjs/testing';
import RolesRepository from '../infra/typeorm/repositories/RolesRepository';
import FakeRolesRepository from '../repositories/fakes/FakeRolesRepository';
import ListAllRolesService from './ListAllRolesService';

let listAllRolesService: ListAllRolesService;

describe('ListAllRolesService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RolesRepository,
          useValue: new FakeRolesRepository(),
        },
        ListAllRolesService,
      ],
    }).compile();

    listAllRolesService = module.get<ListAllRolesService>(ListAllRolesService);
  });

  it('should be able to list all roles', async () => {
    const roles = await listAllRolesService.execute();

    expect(roles.length).toBeGreaterThan(1);
  });
});
