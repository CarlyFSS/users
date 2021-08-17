import { Role } from '@fireheet/entities';
import { Injectable } from '@nestjs/common';
import RolesRepository from '../infra/typeorm/repositories/RolesRepository';

@Injectable()
export default class ListAllRolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  public async execute(): Promise<Role[]> {
    return this.rolesRepository.listAll();
  }
}
