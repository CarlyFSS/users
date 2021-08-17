import { Injectable } from '@nestjs/common';
import IAMQPProvider from '../model/IAMQPProvider';
import AMQPConnection from '../utils/AMQPConnection';

@Injectable()
export default class RabbitMQProvider implements IAMQPProvider {
  constructor(private readonly amqpConnection: AMQPConnection) {}

  async publishInQueue<T>(queue: string, payload: T): Promise<void> {
    const { channel } = this.amqpConnection;

    channel.assertQueue(queue);

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)));
  }

  async publishInExchange<T>(
    exchange: string,
    routingKey: string,
    payload: T,
  ): Promise<void> {
    const { channel } = this.amqpConnection;

    channel.assertExchange(exchange, 'direct');

    channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(payload)));
  }
}
