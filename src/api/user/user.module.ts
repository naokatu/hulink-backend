import { Module } from '@nestjs/common'

import { PrismaService } from '../../prisma.service'
import { UserRepositoryModule } from '../../repository/user/user.repository.module'
import { UserUsecase } from '../../usecase/user/user.usecase'
import { UserController } from './user.controller'

@Module({
  imports: [UserRepositoryModule],
  controllers: [UserController],
  providers: [UserUsecase, PrismaService],
})
export class UserModule {}
