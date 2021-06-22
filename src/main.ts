import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { logVerbose } from '@shared/helper/AppLogger';
import { SwaggerModule } from '@nestjs/swagger';
import openApiDoc from '@shared/docs/create-swagger-docs';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { INestApplication } from '@nestjs/common';
import AppModule from './AppModule';

/**
 * Imports for elastic and prod config
 *
 * import { INestApplication } from '@nestjs/common';
 * import elastic from 'elastic-apm-node';
 * import certConfig from '@config/cert.config';
 */

const PORT = +process.env.PORT;

async function bootstrap() {
  logVerbose('Application', process.env.ORM_TYPE);
  // Starts Elastic Search APM Agent
  // elastic.start({
  //   serviceName: 'users',
  //   serverUrl: 'http://elasticsearch:8200',
  //   secretToken: '0e42111bb2384abd4691700e71cccfca',
  //   environment: 'development',
  // });

  // Setup Nest.Js app
  // if (process.env.NODE_ENV === 'production')
  //   httpClient = await NestFactory.create(AppModule, certConfig);

  const app = await NestFactory.create(AppModule);

  // Create another transport
  // const amqpClient = app.connectMicroservice({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [process.env.RABBITMQ_URI],
  //     queue: 'tenants_queue',
  //     queueOptions: {
  //       durable: false,
  //     },
  //   },
  // });

  // Setup Swagger/Open Api
  // SwaggerModule.setup('api', httpClient, openApiDoc(httpClient));

  // await app.startAllMicroservices();

  await app.listen(PORT);
}

bootstrap();
