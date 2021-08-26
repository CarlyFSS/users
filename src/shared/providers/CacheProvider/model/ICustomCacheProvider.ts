export default interface ICustomCacheProvider<T> {
  store(key: string, data: T): Promise<T>;
  get(key: string): Promise<T>;
  delete(key: string): Promise<T>;

  storeMany?(key?: string, data?: T | T[]): Promise<T>;
  getAll?(key: string): Promise<T>;
}
