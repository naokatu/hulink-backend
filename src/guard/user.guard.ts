import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

import { UnauthorizedException } from '../errors/errors'
import { PrismaService } from '../prisma.service'
import { UserRepository } from '../repository/user/user.repository'

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const firebaseUid = request.claim.uid

    const user = await this.userRepository.getUser(this.prisma, firebaseUid)
    if (user === null) {
      throw new UnauthorizedException('USER_NOT_FOUND', 'user not found')
    }
    request.user = user

    return true
  }
}
