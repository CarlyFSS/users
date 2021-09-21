import { Injectable } from '@nestjs/common';
import { User } from '@fireheet/entities';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BadRequestException } from '@nestjs/common/exceptions';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

@Injectable()
export default class RestoreUserService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly usersRepository: UsersRepository,
  ) {}

  public async execute(user_id: string): Promise<User> {
    const userExists = await this.usersRepository.findByID(user_id);

    if (!userExists) {
      throw new BadRequestException(`User with id "${user_id}" doesn't exist!`);
    }

    if (userExists.deleted_at === null) {
      throw new BadRequestException(
        `User with id "${user_id}" is not deactivated!`,
      );
    }

    const deletedUser = this.usersRepository.activate(userExists.id);

    this.eventEmitter.emit('user.activated', userExists);

    return deletedUser;
  }
}
