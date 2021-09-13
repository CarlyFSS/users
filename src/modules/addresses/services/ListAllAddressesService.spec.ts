import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import UsersRepository from '../../users/infra/typeorm/repositories/UsersRepository';
import AddressesRepository from '../infra/typeorm/repositories/AddressesRepository';
import FakeAddressesRepository from '../repositories/fakes/FakeAddressesRepository';
import CreateAddressDTO from '../dtos/CreateAddressDTO';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import CreateUserDTO from '../../users/dtos/CreateUserDTO';
import ListAllAddressesService from './ListAllAddressesService';

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
    const user = await usersRepository.create(userModel);

    await addressesRepository.create(user.id, addressModel);

    const listedAddress = await listAllAddresses.execute(user.id);

    expect(listedAddress.length).toBeGreaterThanOrEqual(1);
  });

  it('should not be able to list all addresses of a invalid user_id', async () => {
    await expect(listAllAddresses.execute('123')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
