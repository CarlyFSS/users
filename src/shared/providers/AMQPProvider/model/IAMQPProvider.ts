export default interface IAMQPProvider {
  publishInQueue<T>(queue: string, payload: T): Promise<void>;
  publishInExchange<T>(
    exchange: string,
    routingKey: string,
    payload: T,
  ): Promise<void>;
}
