import { PrismaClient } from '@prisma/client'

import {
  createUser,
  userJohnId,
} from '../../database/seeders/test/user'
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
        createdUserId: userJohnId,
        updatedUserId: userJohnId,
      }

      // seed data
      await createUser(prisma)

      // execute
      const result = await repository.getUser(prisma, firebaseUid)

      // assert
      expect(result).toMatchObject(expected)
    })
  })

})
