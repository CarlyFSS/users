import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import IHashProvider from '../model/IHashProvider';

@Injectable()
export default class BcryptHashProvider implements IHashProvider {
  async encrypt(data: string): Promise<string> {
    const rounds = 10;

    const salt = await bcrypt.genSalt(rounds);

    return bcrypt.hash(data, salt);
  }

  async match(data: string, hash: string): Promise<boolean> {
    return bcrypt.compare(data, hash);
  }
}
