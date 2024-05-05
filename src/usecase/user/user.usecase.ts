import { Injectable } from '@nestjs/common'

import { PrismaService } from '../../prisma.service'
import { UserRepository } from '../../repository/user/user.repository'
import { uuidv7 } from '../../utils/generate-uuid'
import * as usecase from './user.interface.usecase'

@Injectable()
export class UserUsecase {
  constructor(
    private userRepository: UserRepository,
    private prisma: PrismaService,
  ) {}

  async getUser(input: usecase.GetUserInput): Promise<usecase.GetUserOutput> {
    return this.prisma.$transaction(async (tx) => {
      const user = await this.userRepository.getUser(tx, input.firebaseUid)

      if (user === null) {
        throw new Error('user not found')
      }

      return {
        user: user,
      }
    })
  }

  async createUser(
    input: usecase.CreateUserInput,
  ): Promise<usecase.CreateUserOutput> {
    return this.prisma.$transaction(async (tx) => {
      const userId = uuidv7()

      const createdUser = await this.userRepository.createUser(tx, {
        id: userId,
        name: input.name,
        firebaseUid: input.firebaseUid,
        email: input.email,
        createdUserId: userId,
        updatedUserId: userId,
      })

      return {
        user: createdUser,
      }
    })
  }
}
