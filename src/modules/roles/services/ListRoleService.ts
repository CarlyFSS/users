import Role from '@fireheet/entities/typeorm/Role';
import { BadRequestException, Injectable } from '@nestjs/common';
import RolesRepository from '../infra/typeorm/repositories/RolesRepository';

@Injectable()
export default class ListRoleService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  public async execute(id: string): Promise<Role> {
    const tenant = await this.rolesRepository.findByID(id);

    if (!tenant) {
      throw new BadRequestException(`User with id "${id}" does not exists!`);
    }

    return tenant;
  }
}
