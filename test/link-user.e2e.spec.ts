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
          {
            id: userSamId,
            userId: userMikeId,
            name: 'Sam',
            weight: 1,
            label: 'friend',
            sex: 'male',
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

describe('POST /v1/link-user', () => {
  it('正常系', async () => {
    const expected = {
      data: {
        linkUser: {
          id: expect.anything(),
          userId: userJohnId,
          name: 'hally',
        },
      },
    }

    // seed
    await createLinkUser(prisma)

    // execute & assert
    return request(app.getHttpServer())
      .post('/v1/link-user')
      .send({
        name: 'hally',
        interact: ['LINE', 'SNS'],
        userId: userJohnId,
      })
      .set('authorization', 'Bearer')
      .expect(HttpStatus.CREATED)
      .then((res) => {
        expect(res.body).toEqual(expected)
      })
  })
})
