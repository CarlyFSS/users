import { Phone } from '@fireheet/entities/typeorm/users';
import CreatePhoneDTO from '../models/dtos/CreatePhoneDTO';

export default interface IPhonesRepository {
  create(user_id: string, data: CreatePhoneDTO): Promise<Phone>;
  update(phone: Phone): Promise<Phone>;
  delete(phone: Phone): Promise<Phone>;
  findByID(id: string): Promise<Phone | undefined>;
}
