import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'

import { Claim } from '../../decorator/claim.decorator'
import { User } from '../../decorator/user.decorator'
import { JwtAuthGuard } from '../../guard/jwt-auth.guard'
import { UserGuard } from '../../guard/user.guard'
import { Claim as ClaimModel } from '../../model/claim'
import { User as UserModel } from '../../model/user'
import { UserUsecase } from '../../usecase/user/user.usecase'
import { User as api } from '../api-interface'

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly usecase: UserUsecase) {}

  @Get()
  @UseGuards(UserGuard)
  async getUser(@User() user: UserModel): Promise<api.GetUser.ResponseBody> {
    const result = await this.usecase.getUser(user)

    return {
      data: {
        user: {
          id: result.user.id,
          name: result.user.name,
          linkUsers: result.user.linkUsers?.map((linkUser) => {
            return {
              id: linkUser.id,
              userId: linkUser.userId,
              name: linkUser.name,
              weight: linkUser.weight ?? undefined,
              label: linkUser.label ?? undefined,
              sex: linkUser.sex ?? undefined,
            }
          }),
        },
      },
    }
  }

  @Post()
  async createUser(
    @Body() body: api.PostUser.RequestBody,
    @Claim() claim: ClaimModel,
  ): Promise<api.PostUser.ResponseBody> {
    const result = await this.usecase.createUser({
      name: body.name,
      firebaseUid: claim.uid,
      email: claim.email,
    })

    const createdUser = {
      id: result.user.id,
      name: result.user.name,
      linkUsers: result.user.linkUsers?.map((linkUser) => {
        return {
          id: linkUser.id,
          userId: linkUser.userId,
          name: linkUser.name,
          weight: linkUser.weight ?? undefined,
          label: linkUser.label ?? undefined,
          sex: linkUser.sex ?? undefined,
        }
      }),
    }

    return {
      data: {
        user: createdUser,
      },
    }
  }
}
