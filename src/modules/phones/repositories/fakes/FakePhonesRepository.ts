import { Phone } from '@fireheet/entities/typeorm/users';
import CreatePhoneDTO from '../../models/dtos/CreatePhoneDTO';
import IPhonesRepository from '../IPhonesRepository';

export default class FakePhonesRepository implements IPhonesRepository {
  private phones: Phone[] = [];

  public async create(user_id: string, data: CreatePhoneDTO): Promise<Phone> {
    return new Phone({ user_id, ...data });
  }

  public async update(phone: Phone): Promise<Phone> {
    const phoneIdx = this.phones.indexOf(phone);

    this.phones[phoneIdx] = phone;

    return this.phones[phoneIdx];
  }

  public async delete(phone: Phone): Promise<Phone> {
    const phoneIdx = this.phones.indexOf(phone);

    phone.deleted_at = new Date();

    this.phones[phoneIdx] = phone;

    return this.phones[phoneIdx];
  }

  public async findByID(id: string): Promise<Phone | undefined> {
    return this.phones.find(phone => phone.id === id);
  }
}
