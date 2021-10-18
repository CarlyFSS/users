import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { MicroserviceOptions } from '@nestjs/microservices';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import fastifyHelmet from 'fastify-helmet';
import AppModule from './AppModule';
import GrpcConfig from './config/GrpcConfig';

async function bootstrap() {
  const DEFAULT_PORT = 3333;

  const PORT = process.env.PORT || DEFAULT_PORT;

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.setGlobalPrefix('v1');

  app.useGlobalPipes(
    new ValidationPipe({
      always: true,
      validationError: {
        target: true,
        value: true,
      },
      errorHttpStatusCode: 406,
      enableDebugMessages: true,
    }),
  );

  await app.register(fastifyHelmet);

  app.connectMicroservice<MicroserviceOptions>(GrpcConfig);

  await app.listen(PORT);
  await app.startAllMicroservices();
}

bootstrap();
