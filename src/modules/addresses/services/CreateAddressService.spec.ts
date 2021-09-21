import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@fireheet/entities';
import { EventEmitter2 } from '@nestjs/event-emitter';
import CreateAddressService from './CreateAddressService';
import UsersRepository from '../../users/infra/typeorm/repositories/UsersRepository';
import AddressesRepository from '../infra/typeorm/repositories/AddressesRepository';
import FakeAddressesRepository from '../repositories/fakes/FakeAddressesRepository';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import UsersMockFactory from '../../users/models/mocks/UsersMockFactory';
import AddressesMockFactory from '../models/mocks/AddressesMockFactory';

const mockFactory = AddressesMockFactory();

let createAddress: CreateAddressService;
let usersRepository: UsersRepository;
let user: User;

describe('CreateAddressService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UsersRepository,
          useValue: new FakeUsersRepository(),
        },
        {
          provide: AddressesRepository,
          useValue: new FakeAddressesRepository(),
        },
        CreateAddressService,
        EventEmitter2,
      ],
    }).compile();

    createAddress = module.get<CreateAddressService>(CreateAddressService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
    user = await usersRepository.create(UsersMockFactory().createUserDTO());
  });

  it('should be able to create a address with a valid credentials', async () => {
    const address = await createAddress.execute(
      user.id,
      mockFactory.createAddressDTO(),
    );

    expect(address).toHaveProperty('id');
  });

  it('should change the main_address_id of the user to the new address', async () => {
    const address = await createAddress.execute(
      user.id,
      mockFactory.createAddressDTO(),
    );

    expect(user.main_address_id).toBe(address.id);
  });

  it('should not be able to create a address with a invalid user id', async () => {
    await expect(
      createAddress.execute('123', mockFactory.createAddressDTO()),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
