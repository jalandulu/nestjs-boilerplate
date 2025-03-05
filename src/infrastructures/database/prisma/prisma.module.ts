import { Global, HttpStatus, Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import {
  PrismaModule as NestPrismaModule,
  PrismaClientExceptionFilter,
  PrismaService,
} from 'nestjs-prisma';
import { APP_FILTER, HttpAdapterHost } from '@nestjs/core';
import { PrismaConfigService } from './prisma.config';

@Global()
@Module({
  imports: [
    NestPrismaModule.forRootAsync({
      isGlobal: true,
      useClass: PrismaConfigService,
    }),
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
      plugins: [
        new ClsPluginTransactional({
          imports: [NestPrismaModule],
          adapter: new TransactionalAdapterPrisma({
            prismaInjectionToken: PrismaService,
          }),
          enableTransactionProxy: true,
        }),
      ],
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      inject: [HttpAdapterHost],
      useFactory: ({ httpAdapter }: HttpAdapterHost) => {
        return new PrismaClientExceptionFilter(httpAdapter, {
          P2000: HttpStatus.BAD_REQUEST,
          P2002: HttpStatus.CONFLICT,
          P2025: HttpStatus.NOT_FOUND,
        });
      },
    },
  ],
})
export class PrismaModule {}
