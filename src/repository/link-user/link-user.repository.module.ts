import { Module } from '@nestjs/common'

import { LinkUserRepository } from './link-user.repository'

@Module({
  providers: [LinkUserRepository],
  exports: [LinkUserRepository],
})
export class LinkUserRepositoryModule {}
