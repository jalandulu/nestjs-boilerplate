import { CacheOptionsFactory } from '@nestjs/cache-manager';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Keyv from 'keyv';
import KeyvRedis from '@keyv/redis';
import { IAppEnv, ICacheServiceEnv } from 'src/cores/interfaces';

@Injectable()
export class RedisConfigService implements CacheOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  async createCacheOptions() {
    const { name } = await this.configService.get<IAppEnv>('app');
    const { password, host, port, ttl } = await this.configService.get<ICacheServiceEnv>('redis');

    const stores = [
      new Keyv({
        store: new KeyvRedis(`redis://:${password}@${host}:${port}`),
        namespace: name,
        ttl: ttl,
      }),
    ];

    return {
      isGlobal: true,
      stores: stores,
    };
  }
}
