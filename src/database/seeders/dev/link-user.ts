import { PrismaClient } from '@prisma/client'
import * as db from '@prisma/client'

const prisma = new PrismaClient()

export const userEmmaId = 'e4e5df5f-03ec-830e-4f14-ae5c82b6aa79'
export const userLilyId = 'AA2D6AC8-3CC6-48CB-B559-038A86C97F94'
export const userSamId = '0193C28F-A9E2-4991-9B12-18BE6BF220EA'


export const linkUser = async () => {
  const createManyInput: db.Prisma.UserCreateManyInput[] = [
    {
      id: userEmmaId,
      name: 'Emma',
    },
    {
      id: userLilyId,
      name: 'Lily',
    },
    {
      id: userSamId,
      name: 'Sam'
    }
  ]
  await prisma.linkUser.createMany({
    data: createManyInput,
  })
}