import { Logger } from '@nestjs/common';

export function log_verbose(context: string, message: string) {
  const logger = new Logger(context);

  logger.verbose(message);
}

export function log_warn(context: string, message: string) {
  const logger = new Logger(context);

  logger.warn(message);
}

export function log_error(context: string, message: string) {
  const logger = new Logger(context);

  logger.error(message);
}

export function log_debug(context: string, message: string) {
  const logger = new Logger(context);

  logger.debug(message);
}
