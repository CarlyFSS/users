import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@fireheet/entities';
import { EventEmitter2 } from '@nestjs/event-emitter';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import UpdateUserDTO from '../dtos/UpdateUserDTO';
import BcryptHashProvider from '../providers/HashProvider/implementations/BcryptHashProvider';

@Injectable()
export default class UpdateUserService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashProvider: BcryptHashProvider,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async execute(
    id: string,
    { email, password, name }: UpdateUserDTO,
  ): Promise<User> {
    const userExists = await this.usersRepository.findByID(id);

    if (!userExists) {
      throw new ForbiddenException(`User with id ${id} not found!`);
    }

    if (password) {
      const encryptedPassword = await this.hashProvider.encrypt(password);

      userExists.password = encryptedPassword;
    }

    userExists.name = name;

    if (email) {
      const emailExists = await this.usersRepository.findByEmail(email);

      if (emailExists) {
        throw new ForbiddenException(
          `User with email "${email}" already exists!`,
        );
      }

      userExists.email = email;

      this.eventEmitter.emit('user.email.updated', email);
    }

    const updatedUser = await this.usersRepository.update(userExists);

    this.eventEmitter.emit('user.updated', updatedUser);

    delete updatedUser.role_id;
    delete updatedUser.password;
    delete updatedUser.document_number;

    return updatedUser;
  }
}
