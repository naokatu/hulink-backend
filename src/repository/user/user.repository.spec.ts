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

  describe('getUser', () => {
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
            weight: 10,
            label: 'family',
            sex: 'female',
          },
          {
            id: userLilyId,
            userId: userJohnId,
            name: 'Lily',
            weight: 10,
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

  describe('createUser', () => {
    it('正常系', async () => {
      const exampleFirebaseUid = 'example_id'
      const expected: Partial<User> = {
        id: '68ee1e99-12bc-d327-853c-e29abb2f7f24',
        name: 'name',
        firebaseUid: exampleFirebaseUid,
        email: 'name@example.com',
        linkUsers: [],
      }

      // seed data
      await createUser(prisma)
      await createLinkUser(prisma)

      // execute
      const result = await repository.createUser(prisma, {
        id: '68ee1e99-12bc-d327-853c-e29abb2f7f24',
        name: 'name',
        firebaseUid: exampleFirebaseUid,
        email: 'name@example.com',
        createdUserId: '68ee1e99-12bc-d327-853c-e29abb2f7f24',
        updatedUserId: '68ee1e99-12bc-d327-853c-e29abb2f7f24',
      })

      // assert
      expect(result).toMatchObject(expected)
    })
  })
})
