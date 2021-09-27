import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from '@fireheet/entities/typeorm/users';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import UpdateUserDTO from '../models/dtos/UpdateUserDTO';
import BcryptHashProvider from '../providers/HashProvider/implementations/BcryptHashProvider';
import AddressesRepository from '../../addresses/infra/typeorm/repositories/AddressesRepository';
import RolesRepository from '../../roles/infra/typeorm/repositories/RolesRepository';

@Injectable()
export default class UpdateUserService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly addressesRepository: AddressesRepository,
    private readonly rolesRepository: RolesRepository,
    private readonly hashProvider: BcryptHashProvider,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async execute(
    user_id: string,
    data: UpdateUserDTO,
    role_id?: string,
  ): Promise<Partial<User>> {
    const userExists = await this.usersRepository.findByID(user_id);

    if (!userExists) {
      throw new NotFoundException(`User with id ${user_id} not found!`);
    }

    if (role_id) {
      const roleExists = await this.rolesRepository.findByID(role_id);

      if (!roleExists) {
        throw new NotFoundException(`Role with id ${role_id} not found!`);
      }

      userExists.role_id = role_id;
    }

    if (data.password) {
      const encryptedPassword = await this.hashProvider.encrypt(data.password);

      userExists.password = encryptedPassword;

      this.eventEmitter.emit('user.password.updated', userExists.email);
    }

    if (data.email) {
      const emailExists = await this.usersRepository.findByEmail(data.email);

      if (emailExists) {
        throw new ForbiddenException(
          `User with email "${data.email}" already exists!`,
        );
      }

      this.eventEmitter.emit('user.email.updated', data.email);
    }

    const addressID = data.main_address_id;

    const addressExists = addressID
      ? await this.addressesRepository.findByID(addressID)
      : undefined;

    userExists.main_address_id =
      addressExists?.id || userExists.main_address_id;

    const updateUser = Object.assign(userExists, data);

    const updatedUser = await this.usersRepository.update(updateUser);

    this.eventEmitter.emit('user.updated', updatedUser.info);

    return updatedUser.info;
  }
}
