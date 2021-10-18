import { ConsoleLogger } from '@nestjs/common';

export function logNormal(context: string, message: string): void {
  const logger = new ConsoleLogger(context);

  logger.log(message);
}

export function logVerbose(context: string, message: string): void {
  const logger = new ConsoleLogger(context);

  logger.verbose(message);
}

export function logWarn(context: string, message: string): void {
  const logger = new ConsoleLogger(context);

  logger.warn(message);
}

export function logError(context: string, message: string): void {
  const logger = new ConsoleLogger(context);

  logger.error(message);
}

export function logDebug(context: string, message: string): void {
  const logger = new ConsoleLogger(context);

  logger.debug(message);
}
