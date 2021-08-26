import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { SwaggerModule } from '@nestjs/swagger';
import openApiDoc from '@shared/docs/create-swagger-docs';
import { MicroserviceOptions } from '@nestjs/microservices';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import AppModule from './AppModule';
import GrpcConfig from './config/GrpcConfig';

async function bootstrap() {
  const defaultPort = 3333;

  const PORT = +process.env.PORT || defaultPort;

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

  SwaggerModule.setup('api', app, openApiDoc(app));

  app.connectMicroservice<MicroserviceOptions>(GrpcConfig);

  await app.listen(PORT);
  await app.startAllMicroservices();
}

bootstrap();
