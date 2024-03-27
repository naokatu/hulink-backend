import { PrismaClient } from '@prisma/client'
import * as db from '@prisma/client'

const prisma = new PrismaClient()

export const userEmmaId = 'e4e5df5f-03ec-830e-4f14-ae5c82b6aa79'
export const userLilyId = 'AA2D6AC8-3CC6-48CB-B559-038A86C97F94'
export const userSamId = '0193C28F-A9E2-4991-9B12-18BE6BF220EA'

export async function createLinkUser() {
  const createManyInput: db.Prisma.LinkUserCreateManyInput[] = [
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
  await prisma.linkUser.createMany({
    data: createManyInput,
  })
}
