import { Role } from '@fireheet/entities/typeorm/users';
import { Injectable } from '@nestjs/common';
import RolesRepository from '../infra/typeorm/repositories/RolesRepository';

@Injectable()
export default class ListAllRolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  public async execute(offset?: number, limit?: number): Promise<Role[]> {
    return this.rolesRepository.listAll(offset, limit);
  }
}
