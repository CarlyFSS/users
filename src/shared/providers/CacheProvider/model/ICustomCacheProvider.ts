export default interface ICustomCacheProvider<T> {
  store(key: string, data: T): Promise<T>;
  get(key: string): Promise<T>;
  delete(key: string): Promise<T>;

  storeMany?(data?: T | T[], key?: string): Promise<T>;
  getAll?(key: string): Promise<T>;
}
