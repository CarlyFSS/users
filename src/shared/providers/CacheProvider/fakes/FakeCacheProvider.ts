import { Injectable } from '@nestjs/common';
import ICustomCacheProvider from '../model/ICustomCacheProvider';

interface FakeCache<T> {
  key: string;
  data: T;
}

@Injectable()
export default class FakeCacheProvider<T> implements ICustomCacheProvider<T> {
  dataArray: FakeCache<T>[] = [];

  async store(key: string, data: T): Promise<T> {
    this.dataArray.push({
      key,
      data,
    });

    return data;
  }

  async storeMany(data?: T, key?: string): Promise<T> {
    this.dataArray.push({
      key,
      data,
    });

    return data;
  }

  async get(key: string): Promise<T> {
    const foundData = this.dataArray.find(data => data.key === key);

    if (foundData) {
      return foundData.data;
    }

    return undefined;
  }

  async delete(key: string): Promise<T> {
    const foundData = this.dataArray.find(data => data.key === key);

    if (foundData) {
      return foundData.data;
    }

    return undefined;
  }
}
