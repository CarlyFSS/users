export default interface ICacheProvider {
  store<T>(key: string, data: T): void;
  storeMany?<T>(data: T): void;
  get<T>(key: string): T;
  delete(key: string): void;
}
