import { User } from '@fireheet/entities/typeorm/users';
import { Test, TestingModule } from '@nestjs/testing';
import FakeCacheProvider from '../../../shared/providers/CacheProvider/fakes/FakeCacheProvider';
import AddressesRepository from '../../addresses/infra/typeorm/repositories/AddressesRepository';
import FakeAddressesRepository from '../../addresses/repositories/fakes/FakeAddressesRepository';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import UsersMockFactory from '../factories/mocks/UsersMockFactory';
import UsersCacheProvider from '../providers/CacheProvider/implementations/UsersCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ListUserService from './ListUserService';
import UsersCacheVerifierService from './UsersCacheVerifierService';

let usersCacheVerifier: UsersCacheVerifierService;
let usersCacheProvider: UsersCacheProvider;
let usersRepository: UsersRepository;
let user: User;

describe('UsersCacheVerifierService', () => {
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
          provide: UsersCacheProvider,
          useValue: new FakeCacheProvider(),
        },
        UsersCacheVerifierService,
        ListUserService,
      ],
    }).compile();

    usersCacheVerifier = module.get<UsersCacheVerifierService>(
      UsersCacheVerifierService,
    );

    usersRepository = module.get<UsersRepository>(UsersRepository);

    usersCacheProvider = module.get<UsersCacheProvider>(UsersCacheProvider);

    user = await usersRepository.create(UsersMockFactory().createUserDTO());
  });

  it('should be able to list a cached user', async () => {
    const cacheGet = jest.spyOn(usersCacheProvider, 'get');
    const cacheStore = jest.spyOn(usersCacheProvider, 'store');

    await usersCacheVerifier.execute(user.id);

    expect(cacheStore).toHaveBeenCalledTimes(1);

    cacheGet.mockResolvedValue(user);

    await usersCacheVerifier.execute(user.id);

    expect(cacheGet).toHaveBeenCalledTimes(2);
  });
});
