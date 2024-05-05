import { Injectable } from '@nestjs/common'

import { PrismaService } from '../../prisma.service'
import { LinkUserRepository } from '../../repository/link-user/link-user.repository'
import { uuidv7 } from '../../utils/generate-uuid'
import * as usecase from './link-user.interface.usecase'

@Injectable()
export class LinkUserUsecase {
  constructor(
    private linkUserRepository: LinkUserRepository,
    private prisma: PrismaService,
  ) {}

  async getLinkUsers(): Promise<usecase.GetLinkUsersOutput> {
    return this.prisma.$transaction(async (tx) => {
      const linkUsers = await this.linkUserRepository.getLinkUsers(tx)

      return {
        linkUsers,
      }
    })
  }

  async createLinkUser(
    input: usecase.CreateLinkUserInput,
  ): Promise<usecase.CreateLinkUserOutput> {
    return this.prisma.$transaction(async (tx) => {
      const linkUserId = uuidv7()

      const createdLinkUser = await this.linkUserRepository.createLinkUser(tx, {
        id: linkUserId,
        name: input.name,
        createdUserId: input.user.id,
        updatedUserId: input.user.id,
        user: {
          connect: {
            id: input.user.id,
          },
        },
      })

      return {
        linkUser: createdLinkUser,
      }
    })
  }
}
