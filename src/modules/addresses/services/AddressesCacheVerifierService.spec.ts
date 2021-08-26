import { Address, User } from '@fireheet/entities';
import { Test, TestingModule } from '@nestjs/testing';
import UsersRepository from '../../users/infra/typeorm/repositories/UsersRepository';
import AddressesRepository from '../infra/typeorm/repositories/AddressesRepository';
import FakeAddressesRepository from '../repositories/fakes/FakeAddressesRepository';
import CreateAddressDTO from '../dtos/CreateAddressDTO';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import CreateUserDTO from '../../users/dtos/CreateUserDTO';
import ListAllAddressesService from './ListAllAddressesService';
import AddressesCacheVerifierService from './AddressesCacheVerifierService';
import ListAddressService from './ListAddressService';
import FakeCacheProvider from '../../../shared/providers/CacheProvider/fakes/FakeCacheProvider';
import AddressesCacheProvider from '../providers/implementations/AddressesCacheProvider';

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

    user = await usersRepository.create(userModel);
    address = await addressesRepository.create(user.id, addressModel);
  });

  it('should be able to list a cached address', async () => {
    const cacheGet = jest.spyOn(addressesCacheProvider, 'get');
    const cacheStore = jest.spyOn(addressesCacheProvider, 'store');

    await addressesCacheVerifier.execute(user.id, address.id);

    expect(cacheStore).toHaveBeenCalledTimes(1);

    await addressesCacheVerifier.execute(user.id, address.id);

    expect(cacheGet).toHaveBeenCalledTimes(2);
  });

  it('should be able to list many cached address', async () => {
    await addressesRepository.create(user.id, addressModel);

    const cacheGet = jest.spyOn(addressesCacheProvider, 'get');
    const cacheStore = jest.spyOn(addressesCacheProvider, 'storeMany');

    await addressesCacheVerifier.execute(user.id, null);

    expect(cacheStore).toHaveBeenCalledTimes(1);

    addressesCacheVerifier.execute(user.id, null);

    expect(cacheGet).toHaveBeenCalledTimes(2);
  });
});
