import { Injectable } from '@nestjs/common';
import IAMQPProvider from '../model/IAMQPProvider';
import AMQPConnection from '../utils/AMQPConnection';

@Injectable()
export default class RabbitMQProvider implements IAMQPProvider {
  constructor(private readonly amqpConnection: AMQPConnection) {}

  async publishInQueue(queue: string, payload: any): Promise<void> {
    const { channel } = this.amqpConnection;

    channel.assertQueue(queue);

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)));
  }

  async publishInExchange(
    exchange: string,
    routingKey: string,
    payload: any,
  ): Promise<void> {
    const { channel } = this.amqpConnection;

    channel.assertExchange(exchange, 'direct');

    channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(payload)));
  }
}
