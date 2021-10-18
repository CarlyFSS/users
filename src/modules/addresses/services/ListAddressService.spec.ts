import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { User } from '@fireheet/entities/typeorm/users';
import UsersRepository from '../../users/infra/typeorm/repositories/UsersRepository';
import AddressesRepository from '../infra/typeorm/repositories/AddressesRepository';
import FakeAddressesRepository from '../repositories/fakes/FakeAddressesRepository';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import ListAddressService from './ListAddressService';
import AddressesMockFactory from '../factories/mocks/AddressesMockFactory';
import UsersMockFactory from '../../users/factories/mocks/UsersMockFactory';

const mockFactory = AddressesMockFactory();

let listAddress: ListAddressService;
let addressesRepository: AddressesRepository;
let usersRepository: UsersRepository;
let user: User;

describe('ListAddressService', () => {
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
        ListAddressService,
      ],
    }).compile();

    listAddress = module.get<ListAddressService>(ListAddressService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
    addressesRepository = module.get<AddressesRepository>(AddressesRepository);
    user = await usersRepository.create(UsersMockFactory().createUserDTO());
  });

  it('should be able to list a valid address', async () => {
    const address = await addressesRepository.create(
      user.id,
      mockFactory.createAddressDTO(),
    );

    const listedAddress = await listAddress.execute(user.id, address.id);

    expect(listedAddress).toHaveProperty('id');
  });

  it('should not be able to delete a address with invalid user_id', async () => {
    const address = await addressesRepository.create(
      user.id,
      mockFactory.createAddressDTO(),
    );

    await expect(listAddress.execute('123', address.id)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('should not be able to delete a address with invalid address_id', async () => {
    await expect(listAddress.execute(user.id, '123')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
