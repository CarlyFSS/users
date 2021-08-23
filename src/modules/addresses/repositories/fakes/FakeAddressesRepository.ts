import { Address } from '@fireheet/entities';
import faker from 'faker';
import CreateAddressDTO from '../../dtos/CreateAddressDTO';
import IAddressesRepository from '../IAddressesRepository';

export default class FakeAddressesRepository implements IAddressesRepository {
  private addresses: Address[] = [];

  public async create(
    user_id: string,
    {
      city,
      complement,
      country,
      district,
      number,
      postal_code,
      state,
      street,
    }: CreateAddressDTO,
  ): Promise<Address> {
    const address: Address = {
      user_id,
      city,
      complement,
      country,
      district,
      number,
      postal_code,
      state,
      street,
      id: faker.datatype.uuid(),
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };

    this.addresses.push(address);

    return address;
  }

  public async update(address: Address): Promise<Address> {
    const addressIdx = this.addresses.indexOf(address);

    this.addresses[addressIdx] = address;

    return this.addresses[addressIdx];
  }

  public async delete(address: Address): Promise<Address | undefined> {
    const addressIdx = this.addresses.indexOf(address);

    address.deleted_at = new Date();

    this.addresses[addressIdx] = address;

    return this.addresses[addressIdx];
  }

  public async findByID(id: string): Promise<Address | undefined> {
    return this.addresses.find(user => user.id === id);
  }

  public async findByStreetAndPostalCode(
    user_id: string,
    street: string,
    number: number,
    postal_code: string,
  ): Promise<Address | undefined> {
    return this.addresses.find(
      address =>
        address.user_id === user_id &&
        address.street === street &&
        address.number === number &&
        address.postal_code === postal_code,
    );
  }

  public async findUserAddresses(
    user_id: string,
  ): Promise<Address[] | undefined> {
    return this.addresses.filter(address => address.user_id === user_id);
  }
}
