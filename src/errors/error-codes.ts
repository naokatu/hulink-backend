
// 400
export type BadRequestResponseErrorCodes = 'OPENAPI_VALIDATION_ERROR'

// 401
export type UnauthorizedResponseErrorCodes =
  | 'INVALID_AUTH_TOKEN'
  | 'USER_NOT_FOUND'

// 500
export type InternalErrorResponseErrorCodes = 'INTERNAL_SERVER_ERROR'

// 503
export type ServiceUnavailableResponseErrorCodes = 'SERVICE_UNAVAILABLE'