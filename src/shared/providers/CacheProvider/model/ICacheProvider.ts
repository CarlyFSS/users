export default interface ICacheProvider {
  store(key: string, data: any): Promise<void>;
  storeMany?(data: any): Promise<void>;
  get<T>(key: string): Promise<T>;
  delete(key: string): Promise<void>;
}
