import amqplib, { Channel, Connection } from 'amqplib';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class AMQPConnection {
  public channel!: Channel;

  public connection!: Connection;

  constructor() {
    this.connect().then(channel => {
      this.channel = channel;
    });
  }

  private async connect(): Promise<Channel> {
    const conn = await amqplib.connect(`${process.env.AMQP_URI}`);

    this.connection = conn;

    return conn.createChannel();
  }
}
