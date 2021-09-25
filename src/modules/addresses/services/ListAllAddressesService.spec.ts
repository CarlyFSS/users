import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import UsersRepository from '../../users/infra/typeorm/repositories/UsersRepository';
import AddressesRepository from '../infra/typeorm/repositories/AddressesRepository';
import FakeAddressesRepository from '../repositories/fakes/FakeAddressesRepository';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import ListAllAddressesService from './ListAllAddressesService';
import AddressesMockFactory from '../factories/mocks/AddressesMockFactory';
import UsersMockFactory from '../../users/factories/mocks/UsersMockFactory';

let listAllAddresses: ListAllAddressesService;
let addressesRepository: AddressesRepository;
let usersRepository: UsersRepository;

describe('ListAllAddressesService', () => {
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
        ListAllAddressesService,
      ],
    }).compile();

    listAllAddresses = module.get<ListAllAddressesService>(
      ListAllAddressesService,
    );
    usersRepository = module.get<UsersRepository>(UsersRepository);
    addressesRepository = module.get<AddressesRepository>(AddressesRepository);
  });

  it('should be able to list all addresses of a valid user_id', async () => {
    const user = await usersRepository.create(
      UsersMockFactory().createUserDTO(),
    );

    await addressesRepository.create(
      user.id,
      AddressesMockFactory().createAddressDTO(),
    );

    const listedAddress = await listAllAddresses.execute(user.id);

    expect(listedAddress.length).toBeGreaterThanOrEqual(1);
  });

  it('should not be able to list all addresses of a invalid user_id', async () => {
    await expect(listAllAddresses.execute('123')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
