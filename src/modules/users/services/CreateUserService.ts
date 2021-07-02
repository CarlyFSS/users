import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import User from '@fireheet/entities/typeorm/User';
import Role from '@fireheet/entities/typeorm/Role';
import { EventEmitter2 } from '@nestjs/event-emitter';
import CreateUserDTO from '../dtos/CreateUserDTO';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import CreateTenantService from '../../tenants/services/CreateTenantService';
import ListRoleByNameService from '../../roles/services/ListRoleByNameService';
import ListTenantByNameService from '../../tenants/services/ListTenantByNameService';
import BcryptHashProvider from '../providers/HashProvider/implementations/BcryptHashProvider';

interface UserTemplate {
  tenant_id?: string;
  role_id?: string;
  name: string;
  document_number: string;
  email: string;
  password: string;
}

@Injectable()
export default class CreateUserService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly usersRepository: UsersRepository,
    private readonly createTenant: CreateTenantService,
    private readonly listTenantByName: ListTenantByNameService,
    private readonly listRoleByName: ListRoleByNameService,
    private readonly hashProvider: BcryptHashProvider,
  ) {}

  public async execute({
    document_number,
    role_id,
    email,
    password,
    name,
  }: CreateUserDTO): Promise<User> {
    const userDocumentExists = await this.usersRepository.findByDocument(
      document_number,
    );

    if (userDocumentExists) {
      throw new BadRequestException(
        `User with document "${document_number}" already exists!`,
      );
    }

    const userEmailExists = await this.usersRepository.findByEmail(email);

    if (userEmailExists) {
      throw new BadRequestException(
        `User with email "${email}" already exists!`,
      );
    }

    const user: UserTemplate = {
      name,
      password,
      email,
      document_number,
    };

    let role: Role;

    if (!role_id) {
      role = await this.listRoleByName.execute('CLIENT');

      user.role_id = role.id;
    } else {
      user.role_id = role_id;
    }

    const createdUserTenant = await this.createTenant.execute({
      name: document_number,
    });

    user.tenant_id = createdUserTenant.id;

    const encryptedPassword = await this.hashProvider.encrypt(password);

    user.password = encryptedPassword;

    const createdUser = await this.usersRepository.create(user);

    this.eventEmitter.emit('user.created', createdUser);

    return createdUser;
  }
}
