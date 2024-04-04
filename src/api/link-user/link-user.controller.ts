import { Controller, Get, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '../../guard/jwt-auth.guard'
import { UserGuard } from '../../guard/user.guard'
import { LinkUserUsecase } from '../../usecase/link-user/link-user.usecase'
import { LinkUser as api } from '../api-interface'

@UseGuards(JwtAuthGuard, UserGuard)
@Controller('link-user')
export class LinkUserController {
  constructor(private readonly usecase: LinkUserUsecase) {}

  @Get()
  async getLinkUsers(): Promise<api.GetLinkUser.ResponseBody> {
    const result = await this.usecase.getLinkUsers()

    return {
      data: result,
    }
  }
}
