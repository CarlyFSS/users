import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from '@fireheet/entities/typeorm/users';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import UpdateUserDTO from '../models/dtos/UpdateUserDTO';
import BcryptHashProvider from '../providers/HashProvider/implementations/BcryptHashProvider';
import AddressesRepository from '../../addresses/infra/typeorm/repositories/AddressesRepository';

@Injectable()
export default class UpdateUserService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly addressesRepository: AddressesRepository,
    private readonly hashProvider: BcryptHashProvider,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async execute(
    id: string,
    { email, password, name, main_address_id }: UpdateUserDTO,
    role_id?: string,
  ): Promise<Partial<User>> {
    const userExists = await this.usersRepository.findByID(id);

    if (!userExists) {
      throw new BadRequestException(`User with id ${id} not found!`);
    }

    if (password) {
      const encryptedPassword = await this.hashProvider.encrypt(password);

      userExists.password = encryptedPassword;

      this.eventEmitter.emit('user.password.updated', userExists.email);
    }

    if (email) {
      const emailExists = await this.usersRepository.findByEmail(email);

      if (emailExists) {
        throw new ForbiddenException(
          `User with email "${email}" already exists!`,
        );
      }

      this.eventEmitter.emit('user.email.updated', email);
    }

    const addressID = main_address_id || '';

    const addressExists = await this.addressesRepository.findByID(addressID);

    userExists.main_address_id =
      addressExists?.id || userExists.main_address_id;

    userExists.role_id = role_id || userExists.role_id;
    userExists.name = name || userExists.name;
    userExists.email = email || userExists.email;

    const updatedUser = await this.usersRepository.update(userExists);

    this.eventEmitter.emit('user.updated', updatedUser.info);

    return updatedUser.info;
  }
}
