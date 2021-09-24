export default interface ICacheProvider<T> {
  store(key: string, data: T): Promise<T | undefined>;
  get(key: string): Promise<T | undefined>;
  delete(key: string): Promise<T | undefined>;
}
