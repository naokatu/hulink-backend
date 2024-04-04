import { HttpStatus, INestApplication } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import * as request from 'supertest'

import {
  createLinkUser,
  userEmmaId,
  userLilyId,
  userSamId,
} from '../src/database/seeders/test/link-user'
import {
  createUser,
  userJohnId,
  userMikeId,
} from '../src/database/seeders/test/user'
import { createTestingApplication } from './test-application'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const prisma: PrismaClient = jestPrisma.client

let app: INestApplication

beforeEach(async () => {
  app = await createTestingApplication()
  await app.init()
  await createUser(prisma)
})

describe('GET /v1/link-user', () => {
  it('正常系', async () => {
    const expected = {
      data: {
        linkUsers: [
          {
            id: userEmmaId,
            name: 'Emma',
            encount: 10,
            label: 'family',
            sex: 'female',
            createdUserId: userJohnId,
            updatedUserId: userJohnId,
          },
          {
            id: userLilyId,
            name: 'Lily',
            encount: 10,
            label: 'family',
            sex: 'female',
            createdUserId: userJohnId,
            updatedUserId: userJohnId,
          },
          {
            id: userSamId,
            name: 'Sam',
            encount: 1,
            label: 'friend',
            sex: 'male',
            createdUserId: userMikeId,
            updatedUserId: userMikeId,
          },
        ],
      },
    }

    // seed
    await createLinkUser(prisma)

    // execute & assert
    return request(app.getHttpServer())
      .get('/v1/link-user')
      .set('authorization', 'Bearer')
      .expect(HttpStatus.OK)
      .expect(expected)
  })
})
