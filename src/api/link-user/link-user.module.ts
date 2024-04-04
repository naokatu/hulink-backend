import { Module } from '@nestjs/common'

import { PrismaService } from '../../prisma.service'
import { LinkUserRepositoryModule } from '../../repository/link-user/link-user.repository.module'
import { UserRepositoryModule } from '../../repository/user/user.repository.module'
import { LinkUserUsecase } from '../../usecase/link-user/link-user.usecase'
import { LinkUserController } from './link-user.controller'

@Module({
  imports: [LinkUserRepositoryModule, UserRepositoryModule],
  controllers: [LinkUserController],
  providers: [LinkUserUsecase, PrismaService],
})
export class LinkUserModule {}
