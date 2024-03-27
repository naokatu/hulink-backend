import { Injectable } from '@nestjs/common'

import { PrismaService } from '../../prisma.service'
import { LinkUserRepository } from '../../repository/link-user/link-user.repository'
import * as usecase from './link-user.interface.usecase'

@Injectable()
export class LinkUserUsecase {
  constructor(
    private linkUserRepository: LinkUserRepository,
    private prisma: PrismaService,
  ) {}

  async getLinkUsers(): Promise<usecase.GetLinkUsersOutput> {
    const linkUsers = await this.linkUserRepository.getLinkUsers(this.prisma)

    return {
      linkUsers,
    }
  }
}
