import { Address } from '@fireheet/entities/typeorm/users';
import CreateAddressDTO from '../models/dtos/CreateAddressDTO';

export default interface IAddressesRepository {
  create(user_id: string, data: CreateAddressDTO): Promise<Address>;
  update(address: Address): Promise<Address>;
  delete(address: Address): Promise<Address>;
  findByID(id: string): Promise<Address | undefined>;
  findByStreetAndPostalCode(
    user_id: string,
    street: string,
    number: number,
    postal_code: string,
  ): Promise<Address | undefined>;
  findUserAddresses(user_id: string): Promise<Address[]>;
}
