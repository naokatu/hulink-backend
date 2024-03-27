import { PrismaClient } from '@prisma/client'

import {
  createLinkUser,
  userEmmaId,
  userLilyId,
  userSamId,
} from '../../database/seeders/test/link-user'
import { LinkUserRepository } from './link-user.repository'

let repository: LinkUserRepository

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const prisma: PrismaClient = jestPrisma.client

beforeEach(() => {
  repository = new LinkUserRepository()
})

describe('LinkUserRepository', () => {
  it('正常系: getLinkUsers', async () => {
    const expected = [
      {
        id: userEmmaId,
        name: 'Emma',
        encount: 10,
        label: 'family',
        sex: 'female',
      },
      {
        id: userLilyId,
        name: 'Lily',
        encount: 10,
        label: 'family',
        sex: 'female',
      },
      {
        id: userSamId,
        name: 'Sam',
        encount: 1,
        label: 'friend',
        sex: 'male',
      },
    ]

    // seed data
    await createLinkUser(prisma)

    // execute
    const result = await repository.getLinkUsers(prisma)

    // assert
    expect(result).toMatchObject(expected)
  })
})
