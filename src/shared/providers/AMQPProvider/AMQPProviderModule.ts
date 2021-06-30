import { Module } from '@nestjs/common';
import RabbitMQProvider from './implementations/RabbitMQProvider';
import AMQPConnection from './utils/AMQPConnection';

@Module({
  providers: [AMQPConnection, RabbitMQProvider],
  exports: [AMQPConnection, RabbitMQProvider],
})
export default class AMQPProviderModule {}
