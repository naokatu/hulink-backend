import { Injectable } from '@nestjs/common'
import * as db from '@prisma/client'

import { User } from '../../model/user'
import { PrismaService } from '../../prisma.service'

@Injectable()
export class UserRepository {
  /**
   * firabase uidをキーにユーザを取得する
   */
  async getUser(
    prisma: db.Prisma.TransactionClient | PrismaService,
    firebaseUid: string,
  ): Promise<User | null> {
    return prisma.user.findUnique({
      include: {
        linkUsers: true,
      },
      where: {
        firebaseUid: firebaseUid,
      },
    })
  }

  async createUser(
    prisma: db.Prisma.TransactionClient | PrismaService,
    input: db.Prisma.UserCreateInput,
  ): Promise<User> {
    console.log(input.firebaseUid)
    const user = await prisma.user.create({
      data: input,
    })

    return {
      ...user,
      linkUsers: [],
    }
  }
}
