import { Controller, Get } from '@nestjs/common'

import { LinkUserUsecase } from '../../usecase/link-user/link-user.usecase'
import { LinkUser as api } from '../api-interface'

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
