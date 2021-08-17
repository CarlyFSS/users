import { Role } from '@fireheet/entities';
import { BadRequestException, Injectable } from '@nestjs/common';
import RolesRepository from '../infra/typeorm/repositories/RolesRepository';

@Injectable()
export default class ListRoleByNameService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  public async execute(name: string): Promise<Role> {
    const role = await this.rolesRepository.findByName(name);

    if (!role) {
      throw new BadRequestException(
        `Role with name "${name}" does not exists!`,
      );
    }

    return role;
  }
}
