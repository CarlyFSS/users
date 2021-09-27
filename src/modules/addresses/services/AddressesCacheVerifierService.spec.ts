import { Test, TestingModule } from '@nestjs/testing';
import { Address, User } from '@fireheet/entities/typeorm/users';
import UsersRepository from '../../users/infra/typeorm/repositories/UsersRepository';
import AddressesRepository from '../infra/typeorm/repositories/AddressesRepository';
import FakeAddressesRepository from '../repositories/fakes/FakeAddressesRepository';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import ListAllAddressesService from './ListAllAddressesService';
import AddressesCacheVerifierService from './AddressesCacheVerifierService';
import ListAddressService from './ListAddressService';
import FakeCacheProvider from '../../../shared/providers/CacheProvider/fakes/FakeCacheProvider';
import AddressesCacheProvider from '../providers/implementations/AddressesCacheProvider';
import UsersMockFactory from '../../users/factories/mocks/UsersMockFactory';
import AddressesMockFactory from '../factories/mocks/AddressesMockFactory';

let addressesCacheVerifier: AddressesCacheVerifierService;
let addressesCacheProvider: AddressesCacheProvider;
let addressesRepository: AddressesRepository;
let usersRepository: UsersRepository;
let user: User;
let address: Address;

describe('AddressesCacheVerifierService', () => {
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
        {
          provide: AddressesCacheProvider,
          useValue: new FakeCacheProvider(),
        },
        AddressesCacheVerifierService,
        ListAllAddressesService,
        ListAddressService,
      ],
    }).compile();

    addressesCacheVerifier = module.get<AddressesCacheVerifierService>(
      AddressesCacheVerifierService,
    );

    usersRepository = module.get<UsersRepository>(UsersRepository);
    addressesRepository = module.get<AddressesRepository>(AddressesRepository);
    addressesCacheProvider = module.get<AddressesCacheProvider>(
      AddressesCacheProvider,
    );

    user = await usersRepository.create(UsersMockFactory().createUserDTO());
    address = await addressesRepository.create(
      user.id,
      AddressesMockFactory().createAddressDTO(),
    );
  });

  it('should be able to list a cached address', async () => {
    const cacheGet = jest.spyOn(addressesCacheProvider, 'get');
    const cacheStore = jest.spyOn(addressesCacheProvider, 'store');

    await addressesCacheVerifier.execute(user.id, address.id);

    expect(cacheStore).toHaveBeenCalledTimes(1);

    cacheGet.mockResolvedValue(address);

    await addressesCacheVerifier.execute(user.id, address.id);

    expect(cacheGet).toHaveBeenCalledTimes(2);
  });

  it('should be able to list many cached address', async () => {
    await addressesRepository.create(
      user.id,
      AddressesMockFactory().createAddressDTO(),
    );

    const cacheGet = jest.spyOn(addressesCacheProvider, 'get');
    const cacheStore = jest.spyOn(addressesCacheProvider, 'storeMany');

    await addressesCacheVerifier.execute(user.id, '');

    expect(cacheStore).toHaveBeenCalledTimes(1);

    addressesCacheVerifier.execute(user.id, '');

    expect(cacheGet).toHaveBeenCalledTimes(2);
  });
});
