import { PrismaClient } from '@prisma/client'

import {
  createLinkUser,
  userEmmaId,
  userLilyId,
  userSamId,
} from '../../database/seeders/test/link-user'
import {
  createUser,
  userJohnId,
  userMikeId,
} from '../../database/seeders/test/user'
import { LinkUserRepository } from './link-user.repository'

describe('linkUserRepository', () => {
  let repository: LinkUserRepository

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const prisma: PrismaClient = jestPrisma.client

  beforeEach(() => {
    repository = new LinkUserRepository()
  })

  describe('getLinkUsers', () => {
    it('正常系: getLinkUsers', async () => {
      const expected = [
        {
          id: userEmmaId,
          userId: userJohnId,
          name: 'Emma',
          encount: 10,
          label: 'family',
          sex: 'female',
          createdUserId: userJohnId,
          updatedUserId: userJohnId,
        },
        {
          id: userLilyId,
          userId: userJohnId,
          name: 'Lily',
          encount: 10,
          label: 'family',
          sex: 'female',
          createdUserId: userJohnId,
          updatedUserId: userJohnId,
        },
        {
          id: userSamId,
          userId: userMikeId,
          name: 'Sam',
          encount: 1,
          label: 'friend',
          sex: 'male',
          createdUserId: userMikeId,
          updatedUserId: userMikeId,
        },
      ]

      // seed data
      await createUser(prisma)
      await createLinkUser(prisma)

      // execute
      const result = await repository.getLinkUsers(prisma)

      // assert
      expect(result).toMatchObject(expected)
    })
  })
})
