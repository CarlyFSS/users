import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { SwaggerModule } from '@nestjs/swagger';
import openApiDoc from '@shared/docs/create-swagger-docs';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import AppModule from './AppModule';
import grpcConfig from './config/grpc.config';

async function bootstrap() {
  const PORT = +process.env.PORT || 3333;

  const app: INestApplication =
    await NestFactory.create<NestFastifyApplication>(
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

  app.connectMicroservice<MicroserviceOptions>(grpcConfig);

  await app.listen(PORT);
  await app.startAllMicroservicesAsync();
}

bootstrap();
