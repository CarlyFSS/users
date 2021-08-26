import { Injectable } from '@nestjs/common';
import { User, Role } from '@fireheet/entities';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ForbiddenException } from '@nestjs/common/exceptions';
import CreateUserDTO from '../dtos/CreateUserDTO';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import ListRoleByNameService from '../../roles/services/ListRoleByNameService';
import BcryptHashProvider from '../providers/HashProvider/implementations/BcryptHashProvider';

interface UserTemplate {
  role_id?: string;
  name: string;
  document_number: string;
  email: string;
  password: string;
  birthdate: Date;
}

@Injectable()
export default class CreateUserService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly usersRepository: UsersRepository,
    private readonly listRoleByName: ListRoleByNameService,
    private readonly hashProvider: BcryptHashProvider,
  ) {}

  public async execute({
    document_number,
    role_id,
    email,
    password,
    name,
    birthdate,
  }: CreateUserDTO): Promise<User> {
    const userDocumentExists = await this.usersRepository.findByDocument(
      document_number,
    );

    if (userDocumentExists) {
      throw new ForbiddenException(
        `User with document "${document_number}" already exists!`,
      );
    }

    const userEmailExists = await this.usersRepository.findByEmail(email);

    if (userEmailExists) {
      throw new ForbiddenException(
        `User with email "${email}" already exists!`,
      );
    }

    const user: UserTemplate = {
      name,
      password,
      email,
      document_number,
      birthdate,
    };

    let role: Role;

    if (!role_id) {
      role = await this.listRoleByName.execute('CLIENT');

      user.role_id = role.id;
    } else {
      user.role_id = role_id;
    }

    const encryptedPassword = await this.hashProvider.encrypt(password);

    user.password = encryptedPassword;

    const createdUser = await this.usersRepository.create(user);

    this.eventEmitter.emit('user.created', createdUser);

    delete createdUser.role_id;
    delete createdUser.password;

    return createdUser;
  }
}
