import { User } from '@fireheet/entities';

export default interface ICacheProvider {
  store<T>(key: string, data: T): T;
  storeMany?<T>(data: T): void;
  get<T>(key: string): Promise<T | any>;
  delete<T>(key: string): T;
}
