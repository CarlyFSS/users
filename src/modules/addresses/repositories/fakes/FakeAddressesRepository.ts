import { Address } from '@fireheet/entities/typeorm/users';
import AddressesMockFactory from '../../factories/mocks/AddressesMockFactory';
import IAddressesRepository from '../IAddressesRepository';

export default class FakeAddressesRepository implements IAddressesRepository {
  private addresses: Address[] = [];

  public async create(user_id: string): Promise<Address> {
    const address = AddressesMockFactory().createAddress(user_id);

    this.addresses.push(address);

    return address;
  }

  public async update(address: Address): Promise<Address> {
    const addressIdx = this.addresses.indexOf(address);

    this.addresses[addressIdx] = address;

    return this.addresses[addressIdx];
  }

  public async delete(address: Address): Promise<Address> {
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

  public async findUserAddresses(user_id: string): Promise<Address[]> {
    return this.addresses.filter(address => address.user_id === user_id);
  }
}
