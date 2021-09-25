import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { User } from '@fireheet/entities/typeorm/users';
import UsersRepository from '../../users/infra/typeorm/repositories/UsersRepository';
import AddressesRepository from '../infra/typeorm/repositories/AddressesRepository';
import FakeAddressesRepository from '../repositories/fakes/FakeAddressesRepository';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import DeleteAddressService from './DeleteAddressService';
import AddressesMockFactory from '../factories/mocks/AddressesMockFactory';
import UsersMockFactory from '../../users/factories/mocks/UsersMockFactory';

const mockFactory = AddressesMockFactory();

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
    user = await usersRepository.create(UsersMockFactory().createUserDTO());
  });

  it('should be able to delete a valid address', async () => {
    const address = await addressesRepository.create(
      user.id,
      mockFactory.createAddressDTO(),
    );

    const deletedAddress = await deleteAddress.execute(user.id, address.id);

    const foundAddress = await addressesRepository.findByID(deletedAddress.id);

    expect(deletedAddress).toHaveProperty('id');

    expect(foundAddress?.deleted_at).toBe(deletedAddress.deleted_at);
  });

  it('should not be able to delete a address with invalid user_id', async () => {
    const address = await addressesRepository.create(
      user.id,
      mockFactory.createAddressDTO(),
    );

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
