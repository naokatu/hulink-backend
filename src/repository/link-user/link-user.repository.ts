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
        name: linkUser.name,
        encount: linkUser.encount,
        label: linkUser.label,
        sex: linkUser.sex,
      }
    })
  }
}
