import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from '@fireheet/entities/typeorm/users';
import UsersRepository from '../../users/infra/typeorm/repositories/UsersRepository';
import AddressesRepository from '../infra/typeorm/repositories/AddressesRepository';
import FakeAddressesRepository from '../repositories/fakes/FakeAddressesRepository';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import UpdateAddressService from './UpdateAddressService';
import UsersMockFactory from '../../users/factories/mocks/UsersMockFactory';
import AddressesMockFactory from '../factories/mocks/AddressesMockFactory';

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
    user = await usersRepository.create(UsersMockFactory().createUserDTO());
  });

  it('should be able to update a valid address', async () => {
    const address = await addressesRepository.create(
      user.id,
      AddressesMockFactory().createAddress(user.id),
    );

    const city = 'other';

    const updatedAddress = await updateAddress.execute(user.id, address.id, {
      city,
    });

    const foundAddress = await addressesRepository.findByID(
      updatedAddress.id || '',
    );

    expect(foundAddress?.city).toBe(city);
  });

  it('should not be able to update a address with invalid user_id', async () => {
    const address = await addressesRepository.create(
      user.id,
      AddressesMockFactory().createAddressDTO(),
    );

    const city = 'other';

    await expect(
      updateAddress.execute('123', address.id, { city }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should not be able to update a address with invalid address_id', async () => {
    const address_id = '123';

    const city = 'other';

    await expect(
      updateAddress.execute(user.id, address_id, { city }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
