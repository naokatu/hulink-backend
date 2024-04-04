import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { Claim as ClaimModel } from '../model/claim'

export const Claim = createParamDecorator(
  (_data: unknown, context: ExecutionContext): ClaimModel => {
    return context.switchToHttp().getRequest().claim
  },
)
