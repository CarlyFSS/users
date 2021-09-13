export default interface ICacheProvider<T> {
  store(key: string, data: T): Promise<T>;
  get(key: string): Promise<T>;
  delete(key: string): Promise<T>;
}
