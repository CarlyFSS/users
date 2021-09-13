import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import RolesRepository from '../infra/typeorm/repositories/RolesRepository';
import FakeRolesRepository from '../repositories/fakes/FakeRolesRepository';
import ListRoleByNameService from './ListRoleByNameService';

let listRoleByName: ListRoleByNameService;

describe('ListRolesByNameService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RolesRepository,
          useValue: new FakeRolesRepository(),
        },
        ListRoleByNameService,
      ],
    }).compile();

    listRoleByName = module.get<ListRoleByNameService>(ListRoleByNameService);
  });

  it('should be able to list a role with a valid name', async () => {
    const roleId = await listRoleByName.execute('CLIENT');

    expect(roleId).toHaveProperty('id');
  });

  it('should not be able to list a role with a invalid name', async () => {
    await expect(listRoleByName.execute('orange')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
