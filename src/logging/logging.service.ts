import { LoggerService as NestLoggerService } from '@nestjs/common'
import { createLogger, Logger } from 'winston'

import { loggingOptions } from './logging.options'

export class LoggingService implements NestLoggerService {
  logger: Logger

  constructor() {
    this.logger = createLogger(loggingOptions)
  }

  log(userAgent: string, responseTime: number, meta: object) {
    this.logger.info('success', { userAgent, responseTime, meta })
  }

  error(userAgent: string, responseTime: number, trace: string, meta?: object) {
    this.logger.error('error', {
      userAgent,
      responseTime,
      trace,
      meta,
    })
  }

  warn(message: string) {
    this.logger.warn(message)
  }

  debug(message: string) {
    this.logger.debug(message)
  }

  verbose(message: string) {
    this.logger.verbose(message)
  }
}
