import { HttpStatus, INestApplication } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import * as request from 'supertest'

import {
  createLinkUser,
  userEmmaId,
  userLilyId,
} from '../src/database/seeders/test/link-user'
import { createUser, userJohnId } from '../src/database/seeders/test/user'
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

describe('GET /v1/user', () => {
  it('正常系', async () => {
    const expected = {
      data: {
        user: {
          id: userJohnId,
          name: 'john',
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
        },
      },
    }

    // seed
    await createLinkUser(prisma)

    // execute & assert
    return request(app.getHttpServer())
      .get('/v1/user')
      .set('authorization', 'Bearer')
      .expect(HttpStatus.OK)
      .expect(expected)
  })
})

describe('POST /v1/user', () => {
  it('正常系', async () => {
    const expected = {
      data: {
        user: {
          id: expect.anything(),
          name: 'Sally',
          linkUsers: [],
        },
      },
    }

    // seed
    await createLinkUser(prisma)

    // execute & assert
    return request(app.getHttpServer())
      .post('/v1/user')
      .send({
        name: 'Sally',
      })
      .set('authorization', 'Bearer')
      .set('x-firebase-uid', 'firebaseUid_Sally')
      .set('x-email', 'sally@example.com')
      .expect(HttpStatus.CREATED)
      .then((res) => {
        expect(res.body).toEqual(expected)
      })
  })
})
