import { Role } from '@fireheet/entities/typeorm/users';
import { BadRequestException, Injectable } from '@nestjs/common';
import RolesRepository from '../infra/typeorm/repositories/RolesRepository';

@Injectable()
export default class ListRoleService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  public async execute(id: string): Promise<Role> {
    const role = await this.rolesRepository.findByID(id);

    if (!role) {
      throw new BadRequestException(`Role with id "${id}" does not exists!`);
    }

    return role;
  }
}
