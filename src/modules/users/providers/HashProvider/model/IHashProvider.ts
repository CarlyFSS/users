export default interface IHashProvider {
  encrypt(data: string): Promise<string>;
  match(data: string, hash: string): Promise<boolean>;
}
