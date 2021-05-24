import { NestFactory } from '@nestjs/core';
// import elastic from 'elastic-apm-node';
// import certConfig from '@config/cert.config';
import 'reflect-metadata';
import { log_verbose } from '@shared/helper/app-logger';
import { SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import openApiDoc from '@shared/docs/create-swagger-docs';
import AppModule from './app.module';

const PORT = process.env.PORT || '3000';

async function bootstrap() {
  // Starts Elastic Search APM Agent
  // elastic.start({
  //   serviceName: 'users',
  //   serverUrl: 'http://elasticsearch:8200',
  //   secretToken: '0e42111bb2384abd4691700e71cccfca',
  //   environment: 'development',
  // });

  // Setup Nest.Js app
  // let httpClient: INestApplication;

  // if (process.env.NODE_ENV === 'production')
  //   httpClient = await NestFactory.create(AppModule, certConfig);

  //   httpClient = await NestFactory.create(AppModule);

  const httpClient = await NestFactory.create(AppModule);

  // Setup Swagger/Open Api
  SwaggerModule.setup('api', httpClient, openApiDoc(httpClient));

  await httpClient.listen(PORT);

  log_verbose('Application', `Server listening on port: ${PORT}`);
}

bootstrap();
