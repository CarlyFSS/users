import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  const swagger = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, swagger);

  app.connectMicroservice<MicroserviceOptions>(GrpcConfig);

  await app.listen(PORT);
  await app.startAllMicroservices();
}

bootstrap();
