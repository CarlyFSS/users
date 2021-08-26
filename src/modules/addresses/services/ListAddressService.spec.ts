import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { User } from '@fireheet/entities';
import UsersRepository from '../../users/infra/typeorm/repositories/UsersRepository';
import AddressesRepository from '../infra/typeorm/repositories/AddressesRepository';
import FakeAddressesRepository from '../repositories/fakes/FakeAddressesRepository';
import CreateAddressDTO from '../dtos/CreateAddressDTO';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import CreateUserDTO from '../../users/dtos/CreateUserDTO';
import ListAddressService from './ListAddressService';

const addressModel: CreateAddressDTO = {
  state: 'test',
  city: 'test',
  complement: 'test',
  country: 'test',
  district: 'test',
  number: 0,
  postal_code: '1234',
  street: 'test',
};

const userModel: CreateUserDTO = {
  name: 'jon',
  email: 'email1',
  password: '123',
  document_number: '123',
  role_id: '123',
  birthdate: new Date(),
};

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
    user = await usersRepository.create(userModel);
  });

  it('should be able to list a valid address', async () => {
    const address = await addressesRepository.create(user.id, addressModel);

    const listedAddress = await listAddress.execute(user.id, address.id);

    expect(listedAddress).toHaveProperty('id');
  });

  it('should not be able to delete a address with invalid user_id', async () => {
    const address = await addressesRepository.create(user.id, addressModel);

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
