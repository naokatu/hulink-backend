import { PrismaClient } from '@prisma/client'
import * as db from '@prisma/client'

import { userJohnId, userMikeId } from './user'

export const userEmmaId = 'e4e5df5f-03ec-830e-4f14-ae5c82b6aa79'
export const userLilyId = 'AA2D6AC8-3CC6-48CB-B559-038A86C97F94'
export const userSamId = '0193C28F-A9E2-4991-9B12-18BE6BF220EA'

export async function createLinkUser(prisma: PrismaClient) {
  const createManyInput: db.Prisma.LinkUserCreateManyInput[] = [
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
  await prisma.linkUser.createMany({
    data: createManyInput,
  })
}
