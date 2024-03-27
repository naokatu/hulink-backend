import { HttpException, HttpStatus } from '@nestjs/common'

import {
  BadRequestResponseErrorCodes,
  InternalErrorResponseErrorCodes,
  ServiceUnavailableResponseErrorCodes,
  UnauthorizedResponseErrorCodes,
} from './error-codes'

export type ErrorObject<
  T extends
    | UnauthorizedResponseErrorCodes
    | ServiceUnavailableResponseErrorCodes
    | InternalErrorResponseErrorCodes
    | BadRequestResponseErrorCodes,
> = {
  code: T
  message: string
}

export class ApplicationException<
  T extends
    | UnauthorizedResponseErrorCodes
    | ServiceUnavailableResponseErrorCodes
    | BadRequestResponseErrorCodes,
> extends HttpException {
  readonly code: T

  constructor(code: T, message: string, status: HttpStatus) {
    super(message, status)
    this.code = code
  }

  getResponse(): ErrorObject<T> {
    return {
      code: this.code,
      message: this.message,
    }
  }
}

export class BadRequestException extends ApplicationException<BadRequestResponseErrorCodes> {
  constructor(code: BadRequestResponseErrorCodes, message: string) {
    super(code, message, HttpStatus.BAD_REQUEST)
  }
}

export class UnauthorizedException extends ApplicationException<UnauthorizedResponseErrorCodes> {
  constructor(code: UnauthorizedResponseErrorCodes, message: string) {
    super(code, message, HttpStatus.UNAUTHORIZED)
  }
}

export class ServiceUnavailableException extends ApplicationException<ServiceUnavailableResponseErrorCodes> {
  constructor(code: ServiceUnavailableResponseErrorCodes, message: string) {
    super(code, message, HttpStatus.SERVICE_UNAVAILABLE)
  }
}
