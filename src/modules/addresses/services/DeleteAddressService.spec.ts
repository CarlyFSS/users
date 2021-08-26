import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { User } from '@fireheet/entities';
import UsersRepository from '../../users/infra/typeorm/repositories/UsersRepository';
import AddressesRepository from '../infra/typeorm/repositories/AddressesRepository';
import FakeAddressesRepository from '../repositories/fakes/FakeAddressesRepository';
import CreateAddressDTO from '../dtos/CreateAddressDTO';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import CreateUserDTO from '../../users/dtos/CreateUserDTO';
import DeleteAddressService from './DeleteAddressService';

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

let deleteAddress: DeleteAddressService;
let addressesRepository: AddressesRepository;
let usersRepository: UsersRepository;
let user: User;

describe('DeleteAddressService', () => {
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
        DeleteAddressService,
      ],
    }).compile();

    deleteAddress = module.get<DeleteAddressService>(DeleteAddressService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
    addressesRepository = module.get<AddressesRepository>(AddressesRepository);
    user = await usersRepository.create(userModel);
  });

  it('should be able to delete a valid address', async () => {
    const address = await addressesRepository.create(user.id, addressModel);

    const deletedAddress = await deleteAddress.execute(user.id, address.id);

    const foundAddress = await addressesRepository.findByID(deletedAddress.id);

    expect(deletedAddress).toHaveProperty('id');

    expect(foundAddress.deleted_at).toBe(deletedAddress.deleted_at);
  });

  it('should not be able to delete a address with invalid user_id', async () => {
    const address = await addressesRepository.create(user.id, addressModel);

    await expect(
      deleteAddress.execute('123', address.id),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should not be able to delete a address with invalid address_id', async () => {
    await expect(deleteAddress.execute(user.id, '123')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
