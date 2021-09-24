import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BadRequestException } from '@nestjs/common/exceptions';
import { User } from '@fireheet/entities/typeorm/users';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

@Injectable()
export default class RestoreUserService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly usersRepository: UsersRepository,
  ) {}

  public async execute(user_id: string): Promise<User | undefined> {
    const userExists = await this.usersRepository.findByID(user_id);

    if (!userExists) {
      throw new BadRequestException(`User with id "${user_id}" doesn't exist!`);
    }

    if (userExists.deleted_at === undefined) {
      throw new BadRequestException(
        `User with id "${user_id}" is not deactivated!`,
      );
    }

    const restoredUser = await this.usersRepository.activate(userExists.id);

    if (restoredUser) {
      this.eventEmitter.emit('user.activated', userExists);
    }

    return restoredUser;
  }
}
