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
          weight: 10,
          label: 'family',
          sex: 'female',
          createdUserId: userJohnId,
          updatedUserId: userJohnId,
        },
        {
          id: userLilyId,
          userId: userJohnId,
          name: 'Lily',
          weight: 10,
          label: 'family',
          sex: 'female',
          createdUserId: userJohnId,
          updatedUserId: userJohnId,
        },
        {
          id: userSamId,
          userId: userMikeId,
          name: 'Sam',
          weight: 1,
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

  describe('createLinkUser', () => {
    it('正常系', async () => {
      const expected = {
        id: expect.anything(),
        userId: userJohnId,
        name: 'hally',
      }

      // seed data
      await createUser(prisma)
      await createLinkUser(prisma)

      const result = await repository.createLinkUser(prisma, {
        id: 'bf625a16-8e59-4288-7925-cfc86e68c5bf',
        user: {
          connect: {
            id: userJohnId,
          },
        },
        name: 'hally',
        createdUserId: userJohnId,
        updatedUserId: userJohnId,
      })

      // assert
      expect(result).toMatchObject(expected)
    })
  })
})
