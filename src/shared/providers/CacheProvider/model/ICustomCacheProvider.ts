export default interface ICustomCacheProvider<T> {
  store(key: string, data: T): Promise<T>;
  get(key: string): Promise<T | undefined>;
  delete(key: string): Promise<T | undefined>;

  storeMany?(data?: T | T[], key?: string): Promise<T>;
  getAll?(key: string): Promise<T>;
}
