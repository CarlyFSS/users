import { User } from '@fireheet/entities';
import { BadRequestException, Injectable } from '@nestjs/common';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

@Injectable()
export default class ListUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findByID(id);

    if (!user) {
      throw new BadRequestException(`User with id "${id}" does not exists!`);
    }

    return user;
  }
}
