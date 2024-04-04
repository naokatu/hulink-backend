import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { User as UserModel } from '../model/user'

export const User = createParamDecorator(
  (_data: unknown, context: ExecutionContext): UserModel => {
    return context.switchToHttp().getRequest().user
  },
)
