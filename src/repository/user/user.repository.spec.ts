import { PrismaClient } from '@prisma/client'

import {
  createLinkUser,
  userEmmaId,
  userLilyId,
} from '../../database/seeders/test/link-user'
import { createUser, userJohnId } from '../../database/seeders/test/user'
import { User } from '../../model/user'
import { UserRepository } from './user.repository'

describe('userRepository', () => {
  let repository: UserRepository

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const prisma: PrismaClient = jestPrisma.client

  beforeEach(() => {
    repository = new UserRepository()
  })

  describe('UserRepository', () => {
    it('正常系: getUser', async () => {
      const firebaseUid = 'firebaseUid_john'
      const expected: Partial<User> = {
        id: userJohnId,
        name: 'john',
        firebaseUid: firebaseUid,
        email: 'john@example.com',
        linkUsers: [
          {
            id: userEmmaId,
            userId: userJohnId,
            name: 'Emma',
            encount: 10,
            label: 'family',
            sex: 'female',
          },
          {
            id: userLilyId,
            userId: userJohnId,
            name: 'Lily',
            encount: 10,
            label: 'family',
            sex: 'female',
          },
        ],
      }

      // seed data
      await createUser(prisma)
      await createLinkUser(prisma)

      // execute
      const result = await repository.getUser(prisma, firebaseUid)

      // assert
      expect(result).toMatchObject(expected)
    })
  })
})
