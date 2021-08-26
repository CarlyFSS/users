import { Injectable } from '@nestjs/common';
import ICacheProvider from '../model/ICacheProvider';

interface FakeCache {
  key: string;
  data: any;
}

@Injectable()
export default class FakeCacheProvider implements ICacheProvider {
  dataArray: FakeCache[] = [];

  store<T>(key: string, data: T): T {
    this.dataArray.push({
      key,
      data,
    });

    return data;
  }

  storeMany<T>(data: T, key?: string): T {
    this.dataArray.push({
      key,
      data,
    });

    return data;
  }

  async get<T>(key: string): Promise<T | any> {
    const foundData = this.dataArray.find(data => data.key === key);

    if (foundData) {
      return foundData.data;
    }

    return null;
  }

  delete<T>(key: string): T {
    const foundData = this.dataArray.find(data => data.key === key);

    if (foundData) {
      return foundData.data;
    }

    return null;
  }
}
