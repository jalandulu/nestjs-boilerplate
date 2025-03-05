import { Global, Module } from '@nestjs/common';
import { RedisModule, RedisService } from './redis';
import { ICacheServiceProvider } from 'src/cores/contracts';

@Global()
@Module({
  imports: [RedisModule],
  providers: [
    {
      provide: ICacheServiceProvider,
      useClass: RedisService,
    },
  ],
  exports: [
    RedisModule,
    {
      provide: ICacheServiceProvider,
      useClass: RedisService,
    },
  ],
})
export class CacheServiceModule {}
