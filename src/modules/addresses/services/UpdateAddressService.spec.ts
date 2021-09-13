import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { User } from '@fireheet/entities';
import { EventEmitter2 } from '@nestjs/event-emitter';
import UsersRepository from '../../users/infra/typeorm/repositories/UsersRepository';
import AddressesRepository from '../infra/typeorm/repositories/AddressesRepository';
import FakeAddressesRepository from '../repositories/fakes/FakeAddressesRepository';
import CreateAddressDTO from '../dtos/CreateAddressDTO';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import CreateUserDTO from '../../users/dtos/CreateUserDTO';
import UpdateAddressService from './UpdateAddressService';
import UpdateAddressDTO from '../dtos/UpdateAddressDTO';

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
  birthdate: new Date(),
};

let updateAddress: UpdateAddressService;
let addressesRepository: AddressesRepository;
let usersRepository: UsersRepository;
let user: User;

describe('UpdateAddressService', () => {
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
        UpdateAddressService,
        EventEmitter2,
      ],
    }).compile();

    updateAddress = module.get<UpdateAddressService>(UpdateAddressService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
    addressesRepository = module.get<AddressesRepository>(AddressesRepository);
    user = await usersRepository.create(userModel);
  });

  it('should be able to update a valid address', async () => {
    const address = await addressesRepository.create(user.id, addressModel);

    const updateModel: UpdateAddressDTO = {
      city: 'test2',
    };

    const updatedAddress = await updateAddress.execute(
      user.id,
      address.id,
      updateModel,
    );

    expect(updatedAddress.city).toBe(updateModel.city);
  });

  it('should not be able to update a address with invalid user_id', async () => {
    const address = await addressesRepository.create(user.id, addressModel);

    const updateModel: UpdateAddressDTO = {
      city: 'test2',
    };

    await expect(
      updateAddress.execute('123', address.id, updateModel),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should not be able to update a address with invalid address_id', async () => {
    const address_id = '123';

    const updateModel: UpdateAddressDTO = {
      city: 'test2',
    };

    await expect(
      updateAddress.execute(user.id, address_id, updateModel),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
