import { Injectable } from '@nestjs/common';
import IHashProvider from '../model/IHashProvider';

@Injectable()
export default class FakeBcryptHashProvider implements IHashProvider {
  async encrypt(data: string): Promise<string> {
    return data;
  }

  async match(data: string, hash: string): Promise<boolean> {
    if (data === hash) {
      return true;
    }

    return false;
  }
}
