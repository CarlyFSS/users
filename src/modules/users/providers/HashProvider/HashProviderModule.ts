import { Module } from '@nestjs/common';
import BcryptHashProvider from './implementations/BcryptHashProvider';

@Module({
  providers: [BcryptHashProvider],
  exports: [BcryptHashProvider],
})
export default class HashProviderModule {}
