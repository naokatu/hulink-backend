import { Injectable } from '@nestjs/common'
import * as db from '@prisma/client'

import { LinkUser } from '../../model/link-user'
import { PrismaService } from '../../prisma.service'

@Injectable()
export class LinkUserRepository {
  /**
   * リンクユーザ一覧を取得する
   */
  async getLinkUsers(
    prisma: db.Prisma.TransactionClient | PrismaService,
  ): Promise<LinkUser[]> {
    const linkUsers = await prisma.linkUser.findMany()
    return linkUsers.map((linkUser) => {
      return {
        id: linkUser.id,
        userId: linkUser.userId,
        name: linkUser.name,
        weight: linkUser.weight,
        label: linkUser.label,
        sex: linkUser.sex,
        createdUserId: linkUser.createdUserId,
        updatedUserId: linkUser.updatedUserId,
      }
    })
  }

  async createLinkUser(
    prisma: db.Prisma.TransactionClient | PrismaService,
    input: db.Prisma.LinkUserCreateInput,
  ): Promise<LinkUser> {
    const linkUser = await prisma.linkUser.create({ data: input })
    return {
      id: linkUser.id,
      userId: linkUser.userId,
      name: linkUser.name,
      weight: linkUser.weight ?? undefined,
      label: linkUser.label ?? undefined,
      sex: linkUser.sex ?? undefined,
    }
  }
}
