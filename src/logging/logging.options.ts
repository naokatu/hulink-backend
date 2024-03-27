import { ConfigService } from '@nestjs/config'
import { Format } from 'logform'
import { format, LoggerOptions, transports } from 'winston'
import * as winstonDailyRotateFile from 'winston-daily-rotate-file'

import { Config } from '../config/configuration'

const configService = new ConfigService<Config>()
const logLevel = configService.get('LOG_LEVEL')
const logPrettyPrint = configService.get('LOG_PRETTY_PRINT')
let formatOption: Format
const dateFormat = 'YYYY-MM-DD hh:mm:ss.SSS'

if (logPrettyPrint) {
  formatOption = format.combine(
    format.timestamp({
      format: dateFormat,
    }),
    format.json(),
    format.prettyPrint(),
  )
} else {
  formatOption = format.combine(
    format.timestamp({
      format: dateFormat,
    }),
    format.json(),
  )
}

export const loggingOptions: LoggerOptions = {
  level: logLevel,
  format: formatOption,
  transports: [
    new transports.Console(),
    // アクセスログ
    new winstonDailyRotateFile({
      level: 'debug',
      datePattern: 'YYYY-MM-DD',
      filename: 'application-%DATE%.log',
      dirname: 'logs',
      maxSize: '20m',
      maxFiles: '30d',
    }),
    // エラーログ
    new winstonDailyRotateFile({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      filename: 'error-%DATE%.log',
      dirname: 'logs',
      maxSize: '20m',
      maxFiles: '30d',
    }),
  ],
}