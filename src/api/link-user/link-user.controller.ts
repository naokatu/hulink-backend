import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'

import { User } from '../../decorator/user.decorator'
import { JwtAuthGuard } from '../../guard/jwt-auth.guard'
import { UserGuard } from '../../guard/user.guard'
import { User as UserModel } from '../../model/user'
import { LinkUserUsecase } from '../../usecase/link-user/link-user.usecase'
import { LinkUser as api } from '../api-interface'

@UseGuards(JwtAuthGuard, UserGuard)
@Controller('link-user')
export class LinkUserController {
  constructor(private readonly usecase: LinkUserUsecase) {}

  @Get()
  async getLinkUsers(): Promise<api.GetLinkUser.ResponseBody> {
    const result = await this.usecase.getLinkUsers()

    const convertedLinkUsers = result.linkUsers.map((linkUser) => {
      return {
        id: linkUser.id,
        userId: linkUser.userId,
        name: linkUser.name,
        weight: linkUser.weight ?? undefined,
        label: linkUser.label ?? undefined,
        sex: linkUser.sex ?? undefined,
      }
    })

    return {
      data: {
        linkUsers: convertedLinkUsers,
      },
    }
  }

  @Post()
  async createLinkUser(
    @Body() body: api.PostLinkUser.RequestBody,
    @User() user: UserModel,
  ): Promise<api.PostLinkUser.ResponseBody> {
    const result = await this.usecase.createLinkUser({
      ...body,
      user: user,
    })

    const linkUser = {
      id: result.linkUser.id,
      userId: result.linkUser.userId,
      name: result.linkUser.name,
      weight: result.linkUser.weight ?? undefined,
      label: result.linkUser.label ?? undefined,
      sex: result.linkUser.sex ?? undefined,
    }

    return {
      data: {
        linkUser: linkUser,
      },
    }
  }
}
