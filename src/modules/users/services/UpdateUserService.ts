import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { User } from '@fireheet/entities';
import { EventEmitter2 } from '@nestjs/event-emitter';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import UpdateUserDTO from '../dtos/UpdateUserDTO';
import BcryptHashProvider from '../providers/HashProvider/implementations/BcryptHashProvider';
import UsersCacheProvider from '../../../shared/providers/CacheProvider/implementations/users/UsersCacheProvider';

@Injectable()
export default class UpdateUserService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersCache: UsersCacheProvider,
    private readonly hashProvider: BcryptHashProvider,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async execute(
    id: string,
    { email, password, name, main_address_id }: UpdateUserDTO,
  ): Promise<User> {
    const userExists = await this.usersRepository.findByID(id);

    if (!userExists) {
      throw new BadRequestException(`User with id ${id} not found!`);
    }

    if (password) {
      const encryptedPassword = await this.hashProvider.encrypt(password);

      userExists.password = encryptedPassword;

      this.eventEmitter.emit('user.password.updated', userExists.email);
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

    userExists.main_address_id = main_address_id;

    const updatedUser = await this.usersRepository.update(userExists);

    this.usersCache.delete<User>(updatedUser.id);

    this.eventEmitter.emit('user.updated', updatedUser);

    delete updatedUser.role_id;
    delete updatedUser.password;
    delete updatedUser.document_number;

    return updatedUser;
  }
}
