import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BadRequestException } from '@nestjs/common/exceptions';
import { User } from '@fireheet/entities/typeorm/users';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

@Injectable()
export default class DeleteUserService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly usersRepository: UsersRepository,
  ) {}

  public async execute(user_id: string): Promise<User | undefined> {
    const userExists = await this.usersRepository.findByID(user_id);

    if (!userExists) {
      throw new BadRequestException(`User with id "${user_id}" doesn't exist!`);
    }

    if (userExists.deleted_at !== undefined) {
      throw new BadRequestException(
        `User with id "${user_id}" is already deleted!`,
      );
    }

    const deletedUser = await this.usersRepository.delete(userExists.id);

    if (deletedUser) {
      this.eventEmitter.emit('user.deleted', userExists);
    }

    return deletedUser;
  }
}
