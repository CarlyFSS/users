import { Address } from '@fireheet/entities';
import CreateAddressDTO from '../../models/dtos/CreateAddressDTO';
import AddressesMockFactory from '../../models/mocks/AddressesMockFactory';
import IAddressesRepository from '../IAddressesRepository';

export default class FakeAddressesRepository implements IAddressesRepository {
  private addresses: Address[] = [];

  public async create(
    user_id: string,
    data: CreateAddressDTO,
  ): Promise<Address> {
    const address = AddressesMockFactory().createAddress({ ...data, user_id });

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
        address.zip_code === postal_code,
    );
  }

  public async findUserAddresses(
    user_id: string,
  ): Promise<Address[] | undefined> {
    return this.addresses.filter(address => address.user_id === user_id);
  }
}
