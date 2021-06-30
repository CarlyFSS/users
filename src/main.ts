import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { SwaggerModule } from '@nestjs/swagger';
import openApiDoc from '@shared/docs/create-swagger-docs';
import { INestApplication } from '@nestjs/common';
import certConfig from '@config/cert.config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import AppModule from './AppModule';
import grpcConfig from './config/grpc.config';

async function bootstrap() {
  const PORT = +process.env.PORT || 3333;

  let app: INestApplication;

  if (process.env.NODE_ENV === 'production') {
    app = await NestFactory.create(AppModule, certConfig);
  } else {
    app = await NestFactory.create(AppModule);
  }

  app.setGlobalPrefix('v1');

  SwaggerModule.setup('api', app, openApiDoc(app));

  app.connectMicroservice<MicroserviceOptions>(grpcConfig);

  await app.listen(PORT);
  await app.startAllMicroservicesAsync();
}

bootstrap();
