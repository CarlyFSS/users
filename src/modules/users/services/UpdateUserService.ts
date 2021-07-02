import { Injectable } from '@nestjs/common';
import User from '@fireheet/entities/typeorm/User';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import UpdateUserDTO from '../dtos/UpdateUserDTO';

@Injectable()
export default class UpdateUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute(data: UpdateUserDTO): Promise<User> {
    return new User();
  }
}
