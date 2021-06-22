import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { SwaggerModule } from '@nestjs/swagger';
import openApiDoc from '@shared/docs/create-swagger-docs';
import { INestApplication } from '@nestjs/common';
import certConfig from '@config/cert.config';
import AppModule from './AppModule';

async function bootstrap() {
  // Starts Elastic Search APM Agent
  // elastic.start({
  //   serviceName: 'users',
  //   serverUrl: 'http://elasticsearch:8200',
  //   secretToken: '0e42111bb2384abd4691700e71cccfca',
  //   environment: 'development',
  // });

  const PORT = +process.env.PORT || 3333;

  let app: INestApplication;

  if (process.env.NODE_ENV === 'production') {
    app = await NestFactory.create(AppModule, certConfig);
  } else {
    app = await NestFactory.create(AppModule);
  }

  app.setGlobalPrefix('v1');

  SwaggerModule.setup('api', app, openApiDoc(app));

  await app.listen(PORT);
}

bootstrap();
