import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus, Logger,
} from '@nestjs/common'
import { Response } from 'express'
import { error as validatorErrors } from 'express-openapi-validator'

import { InternalErrorResponseErrorCodes } from '../errors/error-codes'
import { ApplicationException, ErrorObject } from '../errors/errors'

interface ValidationError {
  status: number
  message: string
  errors: Array<{
    path: string
    message: string
    error_code?: string
  }>
  path?: string
  name: string
  headers: {
    [header: string]: string
  }
}

@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    const logger = new Logger(HttpExceptionFilter.name)

    if (error.stack != null) {
      logger.error(error.stack)
    }

    if (error instanceof ApplicationException) {
      response.status(error.getStatus()).json(error.getResponse())
    } else if (this.isValidationError(error)) {
      const validatorError = error as ValidationError
      const errorResponse = {
        code: 'OPENAPI_VALIDATION_ERROR',
        errors: validatorError.errors,
      }
      response.status(HttpStatus.BAD_REQUEST).json(errorResponse)
    } else {
      const errorResponse: ErrorObject<InternalErrorResponseErrorCodes> = {
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message,
      }
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
  }

  private isValidationError(error: Error): boolean {
    return Object.values(validatorErrors).some(
      (validatorError) => error instanceof validatorError,
    )
  }
}