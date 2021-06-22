import { Logger } from '@nestjs/common';

export function logNormal(context: string, message: string) {
  const logger = new Logger(context);

  logger.log(message);
}

export function logVerbose(context: string, message: string) {
  const logger = new Logger(context);

  logger.verbose(message);
}

export function logWarn(context: string, message: string) {
  const logger = new Logger(context);

  logger.warn(message);
}

export function logError(context: string, message: string) {
  const logger = new Logger(context);

  logger.error(message);
}

export function logDebug(context: string, message: string) {
  const logger = new Logger(context);

  logger.debug(message);
}
