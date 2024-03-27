import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

import { LoggingService } from '../logging/logging.service'

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly logService: LoggingService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const startResponseTime = Date.now()
    const oldWrite = res.write
    const oldEnd = res.end
    const chunks: Buffer[] = []

    req.logger = { trace: '' }

    res.write = function (...args) {
      chunks.push(Buffer.from(args[0]))

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return oldWrite.apply(res, args)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    res.end = (...args) => {
      if (args[0]) chunks.push(Buffer.from(args[0]))

      const resBody = Buffer.concat(chunks).toString('utf8')

      const meta = {
        request: {
          method: req.method,
          path: req.path,
          header: req.headers,
          body: req.body,
          ip: req.ip,
        },
        response: {
          code: res.statusCode,
          body: resBody,
        },
      }
      const userAgent = req.headers['user-agent'] || 'user-agent is undefined.'
      const responseTime = Date.now() - startResponseTime

      if (req.logger.trace) {
        const trace = req.logger.trace
        this.logService.error(userAgent, responseTime, trace, meta)

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return oldEnd.apply(res, args)
      }
      this.logService.log(userAgent, responseTime, meta)

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return oldEnd.apply(res, args)
    }
    next()
  }
}