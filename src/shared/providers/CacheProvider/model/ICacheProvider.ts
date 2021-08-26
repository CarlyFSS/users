export default interface ICacheProvider {
  store<T>(key: string, data: T): T | Promise<T>;
  storeMany?<T>(data: T): void;
  get<T>(key: string): Promise<T | any>;
  delete<T>(key: string): T;
}
