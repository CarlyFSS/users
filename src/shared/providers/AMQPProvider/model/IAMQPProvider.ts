export default interface IAMQPProvider {
  publishInQueue(queue: string, payload: any): Promise<void>;
  publishInExchange(
    exchange: string,
    routingKey: string,
    payload: any,
  ): Promise<void>;
}
