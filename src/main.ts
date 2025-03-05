import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { VersioningType } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { ValidationPipe } from './middlewares/pipes';
import { LoggingInterceptor } from './middlewares/interceptors';
import fastifyMultipart from '@fastify/multipart';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
      trustProxy: true,
    }),
  );

  await app.register(fastifyMultipart);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.enableCors({
    origin: process.env.CORS.trim().split(','),
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validateCustomDecorators: true,
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalInterceptors(new LoggingInterceptor());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nest Biolerplate CMS API')
    .setDescription('Nest Biolerplate CMS API Project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  app.use(
    '/docs',
    apiReference({
      withFastify: true,
      spec: {
        content: document,
      },
    }),
  );

  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
